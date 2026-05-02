export function parseWeatherData(object) {
    // لازم الاسم يطابق اللي راجع من api.js
    const { current: currentData, forecast: forecastData, daysData: dayForcastData } = object;
    
    const { weather: [{ description, icon }], main: { temp: currentTempreture }, wind: { speed: windSpeed } } = currentData;
    
    // سحب الـ list من الـ forecastData وعمل slice
    const hourForcast = forecastData.list.slice(0, 8); 

    return {
        editedCurrent: {
            currentDescription: description,
            currentIcon: icon,
            currentTemp: Math.round(currentTempreture), // تقريب الحرارة
            currentWindSpeed: windSpeed
        },
        hourForcast: hourForcast, // دي الـ Array اللي هتتعمل لها map
        dayForcast: dayForcastData // دي الـ Array بتاعة الـ 5 أيام
    };
}