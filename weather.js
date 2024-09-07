
//////////////////////////////////////////////////////////////////////////


const apiKey = `42c106938ffa5c566d308c1f0682f86e`;
// const city = "gondia";

async function fetchWeatherData(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);

        updateWeatherUI(data);
    } catch (error) {
        console.error(`Error fetching weather data:`, error);
    }
}

const cityElement = document.querySelector(".city");
const temperature = document.querySelector(".temp");
const windSpeed = document.querySelector(".wind-speed");
const humidity = document.querySelector(".humidity");
const visibility = document.querySelector(".visibility-distance");
const descriptionText = document.querySelector(".description-text");
const date = document.querySelector(".date");
const descriptionIcon = document.querySelector(".description i")

// fetchWeatherData();

function updateWeatherUI(data) {

    cityElement.textContent = data.name;
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    windSpeed.textContent = `${data.wind.speed} km/h`;
    humidity.textContent = `${data.main.humidity}%`;
    visibility.textContent = `${data.visibility /1000} km`;
    descriptionText.textContent = data.weather[0].description;

    const currentDate = new Date();
    date.textContent = currentDate.toDateString();
    const weatherIconName = getweatherIconName(data.weather[0].main);
    descriptionIcon.innerHTML = `<i class="material-icons">${weatherIconName}</i>`;
}

const formElement= document.querySelector(".search-form");
const inputElemnt = document.querySelector(".city-input");

formElement.addEventListener('submit',function(e){
    e.preventDefault();
    
    const city = inputElemnt.value;

    if(city !== ""){
        fetchWeatherData(city);
        inputElement.value = "";
    }
});

    function getweatherIconName(weatherCondition) {
        const iconMap = {
            Clear: "wb_sunny",
            Clouds: "wb_cloudy",
            Rain: "umbrella",
            Thunderstorm: "flash_on",
            Drizzle: "grain",
            Snow: "ac_unit",
            Mist: "cloud",
            Smoke: "cloud",
            Haze: "cloud",
            Fog: "cloud",
        };
    return iconMap[weatherCondition] || "help";
     
}