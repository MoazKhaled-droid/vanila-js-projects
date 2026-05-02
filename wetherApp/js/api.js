/**
    first api
    data.weather[0].icon;
    data.weather[0].description;
    data.main.temp;
    data.wind.speed;
    data.dt
 */

/*
    sec api
    list 5 points
    data.weather[0].icon;
    data.weather[0].description;
    data.main.temp;
    data.wind.speed;
    data.dt

    and filter date.getHoures === 12
*/
const API_KEY = "98107e7bac26c93ba120c638e1e71781";
const BASE_URL = "https://api.openweathermap.org/data/2.5/";
export async function getWeatherData(location) {

    try {
        const currentUrl = `${BASE_URL}weather?q=${location}&appid=${API_KEY}&units=metric`;
        const forecastUrl = `${BASE_URL}forecast?q=${location}&appid=${API_KEY}&units=metric`;
        const [currentRes, forecastRes] = await Promise.all([
            fetch(currentUrl),
            fetch(forecastUrl)
        ]
        );
        if (!currentRes.ok || !forecastRes.ok) {
            throw new Error("Location not found or API error")
        };
        const [currentData, forecastData] = await Promise.all([
            currentRes.json(),
            forecastRes.json()
        ]
        );
        const daysForecastData =  forecastData.list.filter((item) => {
            let date = new Date(item["dt_txt"]);
            return date.getHours() === 12;
        })
        return {
            current: currentData,
            forecast: forecastData,
            daysData: daysForecastData
        }
    } catch (Error) {
        console.log("there is an eror")
    }
} 
