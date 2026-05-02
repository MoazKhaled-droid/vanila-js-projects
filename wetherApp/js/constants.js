export const weatherIcons = {
    "01d": '<i class="fa-solid fa-sun icon-01d"></i>',
    "01n": '<i class="fa-solid fa-moon icon-01n"></i>',
    "02d": '<i class="fa-solid fa-cloud-sun icon-02d"></i>',
    "02n": '<i class="fa-solid fa-cloud-moon icon-02n"></i>',
    "03d": '<i class="fa-solid fa-cloud icon-03d"></i>',
    "03n": '<i class="fa-solid fa-cloud icon-03n"></i>',
    "04d": '<i class="fa-solid fa-cloud-meatball icon-04d"></i>',
    "04n": '<i class="fa-solid fa-cloud-meatball icon-04n"></i>',
    "09d": '<i class="fa-solid fa-cloud-showers-heavy icon-09d"></i>',
    "09n": '<i class="fa-solid fa-cloud-showers-heavy icon-09n"></i>',
    "10d": '<i class="fa-solid fa-cloud-sun-rain icon-10d"></i>',
    "10n": '<i class="fa-solid fa-cloud-moon-rain icon-10n"></i>',
    "11d": '<i class="fa-solid fa-bolt icon-11d"></i>',
    "11n": '<i class="fa-solid fa-bolt icon-11n"></i>',
    "13d": '<i class="fa-solid fa-snowflake icon-13d"></i>',
    "13n": '<i class="fa-solid fa-snowflake icon-13n"></i>',
    "50d": '<i class="fa-solid fa-smog icon-50d"></i>',
    "50n": '<i class="fa-solid fa-smog icon-50n"></i>'
};

export const countryCities = {

    "EG": [
        "Cairo", "Giza", "Alexandria", "Shubra El Kheima",
        "Port Said", "Suez", "Luxor", "Aswan",
        "Mansoura", "Tanta", "Fayoum", "Zagazig",
        "Ismailia", "Damanhur"
    ],

    "SA": ["Riyadh", "Jeddah", "Mecca", "Medina", "Dammam", "Khobar"],
    "AE": ["Abu Dhabi", "Dubai", "Sharjah", "Ajman", "Fujairah", "Ras Al Khaimah"],

    "US": ["Washington", "New York", "Los Angeles", "Chicago", "Houston", "Miami", "San Francisco"],
    "GB": ["London", "Manchester", "Birmingham", "Liverpool", "Leeds", "Glasgow"],
    "FR": ["Paris", "Lyon", "Marseille", "Nice", "Toulouse", "Bordeaux"],
    "DE": ["Berlin", "Munich", "Hamburg", "Frankfurt", "Cologne", "Stuttgart"],
    "IT": ["Rome", "Milan", "Naples", "Turin", "Florence", "Venice"],
    "ES": ["Madrid", "Barcelona", "Valencia", "Seville", "Malaga", "Bilbao"],

    "TR": ["Ankara", "Istanbul", "Izmir", "Bursa", "Antalya", "Konya"],

    "RU": [
        "Moscow", "Saint Petersburg", "Novosibirsk",
        "Yekaterinburg", "Kazan", "Nizhny Novgorod",
        "Samara", "Chelyabinsk", "Omsk", "Rostov-on-Don"
    ],

    "JP": ["Tokyo", "Osaka", "Kyoto", "Yokohama", "Nagoya", "Sapporo"],
    "CN": ["Beijing", "Shanghai", "Guangzhou", "Shenzhen", "Chengdu", "Wuhan"],
    "CA": ["Ottawa", "Toronto", "Vancouver", "Montreal", "Calgary", "Edmonton"],
    "BR": ["Brasilia", "Rio de Janeiro", "Sao Paulo", "Salvador", "Fortaleza", "Curitiba"],
    "IN": ["New Delhi", "Mumbai", "Bangalore", "Kolkata", "Chennai", "Hyderabad"],

    "MX": ["Mexico City", "Cancun", "Guadalajara", "Monterrey", "Puebla", "Tijuana"],
    "AR": ["Buenos Aires", "Cordoba", "Rosario", "Mendoza", "La Plata"],

    "AU": ["Canberra", "Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide"],

    "KR": ["Seoul", "Busan", "Incheon", "Daegu", "Daejeon", "Gwangju"],

    "ZA": ["Pretoria", "Cape Town", "Johannesburg", "Durban", "Port Elizabeth"],

    "NG": ["Abuja", "Lagos", "Kano", "Ibadan", "Port Harcourt"],

    "PK": ["Islamabad", "Karachi", "Lahore", "Faisalabad", "Peshawar"],

    "BD": ["Dhaka", "Chittagong", "Khulna", "Rajshahi"],

    "VN": ["Hanoi", "Ho Chi Minh City", "Da Nang", "Hai Phong"],

    "TH": ["Bangkok", "Phuket", "Chiang Mai", "Pattaya"],

    "ID": ["Jakarta", "Surabaya", "Bandung", "Medan"],

    "IQ": ["Baghdad", "Basra", "Mosul", "Erbil"],

    "IR": ["Tehran", "Mashhad", "Isfahan", "Shiraz"],
    "KW": ["Kuwait City", "Al Ahmadi", "Hawalli", "Jahra"],
    "QA": ["Doha", "Al Rayyan", "Al Wakrah", "Umm Salal"],
    "BH": ["Manama", "Riffa", "Muharraq", "Isa Town"],
    "OM": ["Muscat", "Salalah", "Sohar", "Nizwa"],
    "JO": ["Amman", "Zarqa", "Irbid", "Aqaba"],
    "LB": ["Beirut", "Tripoli", "Sidon", "Tyre"],
    "IQ": ["Baghdad", "Basra", "Mosul", "Erbil", "Najaf", "Karbala"],
    "DZ": ["Algiers", "Oran", "Constantine", "Annaba", "Blida"],
    "MA": ["Rabat", "Casablanca", "Marrakech", "Fez", "Tangier"],
    "TN": ["Tunis", "Sfax", "Sousse", "Kairouan", "Bizerte"],
    "LY": ["Tripoli", "Benghazi", "Misrata", "Sabha", "Zawiya"],
    "SD": ["Khartoum", "Omdurman", "Port Sudan", "Nyala", "Kassala"],
    "SY": ["Damascus", "Aleppo", "Homs", "Latakia", "Hama"],
    "YE": ["Sanaa", "Aden", "Taiz", "Hodeidah", "Ibb"]
};
export const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];

export const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

export const dateField = document.getElementById("Date");
export const weatherCase = document.getElementById("weatherCase");
export const tempDetails = document.getElementById("tempDetails");
export const countrySelect = document.getElementById("country-select");
export const currentTemp = document.getElementById("currentTemp");
export const windSpeed = document.getElementById("windSpeed");
export const daysForecast = document.getElementById("forecast");