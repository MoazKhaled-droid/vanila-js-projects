import { dateField, days, months, tempDetails, windSpeed, weatherCase, daysForecast, currentTemp, weatherIcons } from "./constants.js";

export function renderCurrent(current, timezone) {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const cityDate = new Date(utc + (1000 * timezone));

    document.body.style.backgroundImage = `url(./assets/imges/${current.currentIcon}.jpg)`;
    
    let hour = cityDate.getHours();
    let displayHour = hour > 12 ? `${hour - 12} PM` : (hour === 0 ? "12 AM" : `${hour} AM`);
    let currentDate = `${cityDate.getDate()} ${months[cityDate.getMonth()]} ${cityDate.getFullYear()} | ${displayHour}`;
    
    dateField.textContent = currentDate;
    weatherCase.textContent = current.currentDescription;
    currentTemp.textContent = current.currentTemp + "°C";
    windSpeed.textContent = `Wind speed: ${current.currentWindSpeed} km/h`;
}

export function renderDaysForecast(dayForcastObj) {
    if (!dayForcastObj) return;
    let dayForcastsCards = dayForcastObj.map(({ weather: [{ description, icon }], main: { temp }, dt_txt: time }) => {
        let date = new Date(time);
        return `
        <div class="forecast">
            <span class="icon">${weatherIcons[icon]}</span>
            <div class="info">
                <span>${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}</span>
                <span>${description}</span>
            </div>
            <div class="deg">
                <span>${Math.round(temp)}°</span>
            </div>
        </div>`;
    }).join("");
    daysForecast.innerHTML = dayForcastsCards; 
}




export function renderHoursForecast(forecast) {
    let hoursForcastsCards = forecast.map(({ weather: [{ description, icon }], main: { temp: currentTempreture }, wind: { speed: windSpeed }, dt_txt: time }) => {
        let date = new Date(time);
        let hour = date.getHours() > 12 ? `${date.getHours() - 12} PM` : `${date.getHours()} AM`
        return `
                <div class="temp-card glass-effect">
                    <span>${hour}</span>
                    <span>${weatherIcons[icon]}</span>
                    <span>${currentTempreture}°C</span>
                </div>
        `
    }).join("");
    tempDetails.innerHTML = hoursForcastsCards;
}