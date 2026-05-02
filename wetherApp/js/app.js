import { populateSelect } from "./select.js";
import { getWeatherData } from "./api.js";
import { parseWeatherData } from "./logic.js";
import { renderCurrent, renderDaysForecast, renderHoursForecast } from "./ui.js";
localStorage.clear()
$(document).ready(async function () {
    populateSelect();

    const countrySelect = $('#country-select').select2({
        placeholder: "Search City...",
        width: '100%'
    });

    const lastCity = localStorage.getItem("lastCity");
    
    if (lastCity) {
        console.log(`Welcome back Crocodile! Loading: ${lastCity}`);
        countrySelect.val(lastCity).trigger('change.select2');
        updateWeather(lastCity);
    } else {
        const defaultCity = "Tanta,EG"; 
        countrySelect.val(defaultCity).trigger('change.select2');
        updateWeather(defaultCity);
    }

    countrySelect.on('change', function () {
        const selectedValue = $(this).val();
        if (selectedValue && selectedValue !== lastCity) {
            localStorage.setItem("lastCity", selectedValue);
            updateWeather(selectedValue);
        }
    });

    async function updateWeather(location) {
        try {
            $('body').addClass('is-loading');
            
            const rawData = await getWeatherData(location);
            if (rawData) {
                const cleanData = parseWeatherData(rawData);

                renderCurrent(cleanData.editedCurrent, rawData.current.timezone);
                renderHoursForecast(cleanData.hourForcast);
                renderDaysForecast(cleanData.dayForcast);
            }
        } catch (error) {
            console.error("Error updating weather:", error);
        } finally {
            $('body').removeClass('is-loading');
        }
    }
});