const weatherImages = {
    "Rain, Partially cloudy": "/images/Rainy.svg",
    "Partially cloudy": "/images/PartlyCloudy.svg",
    "Clear": "/images/Sunny.svg",
    "Overcast": "/images/overcast.svg",
    "Rain, Overcast": "/images/Rainy.svg"

}

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function getDom() {
    const container = document.querySelector('.container');
    const searchBar = document.querySelector('.search-bar');
    const weatherView = document.querySelector('.weather-view');
    const headings = document.querySelectorAll('h1');
    const searchedLocation = document.getElementsByClassName("searched-location");
    const weatherPrediction = document.getElementsByClassName("weather-prediction");
    const searchView = document.getElementsByClassName("search-view");


    return {
        container,
        searchBar,
        weatherView,
        headings,
        searchedLocation,
        weatherPrediction,
        searchView
    };
}

function generateWeatherComponent(day, temperature, humidity, windspeed, imgSrc) {
    // Container für das Wetter-Component erstellen
    const weatherComponent = document.createElement('div');
    weatherComponent.classList.add('weather-component');

    // Bild hinzufügen
    const weatherImage = document.createElement('img');
    weatherImage.src = imgSrc;
    weatherComponent.appendChild(weatherImage);

    // Überschrift
    const heading = document.createElement('h1');
    heading.textContent = day;
    weatherComponent.appendChild(heading);

    // Wetterinformationen Container
    const weatherInformation = document.createElement('div');
    weatherInformation.classList.add('weather-information');

    // Temperatur
    const temperatureDiv = document.createElement('div');
    temperatureDiv.classList.add('information');
    const tempLabel = document.createElement('label');
    tempLabel.classList.add('weather-description');
    tempLabel.textContent = 'Temperature: ';
    const tempValue = document.createElement('label');
    tempValue.setAttribute('id', 'temperature-value');
    tempValue.textContent = `${temperature}°`;
    temperatureDiv.appendChild(tempLabel);
    temperatureDiv.appendChild(tempValue);
    weatherInformation.appendChild(temperatureDiv);

    // Luftfeuchtigkeit
    const humidityDiv = document.createElement('div');
    humidityDiv.classList.add('information');
    const humidityLabel = document.createElement('label');
    humidityLabel.classList.add('weather-description');
    humidityLabel.textContent = 'Humidity: ';
    const humidityValue = document.createElement('label');
    humidityValue.setAttribute('id', 'humidity-value');
    humidityValue.textContent = `${humidity}%`;
    humidityDiv.appendChild(humidityLabel);
    humidityDiv.appendChild(humidityValue);
    weatherInformation.appendChild(humidityDiv);

    // Windgeschwindigkeit
    const windspeedDiv = document.createElement('div');
    windspeedDiv.classList.add('information');
    const windspeedLabel = document.createElement('label');
    windspeedLabel.classList.add('weather-description');
    windspeedLabel.textContent = 'Windspeed: ';
    const windspeedValue = document.createElement('label');
    windspeedValue.setAttribute('id', 'windspeed-value');
    windspeedValue.textContent = `${windspeed} km/h`;
    windspeedDiv.appendChild(windspeedLabel);
    windspeedDiv.appendChild(windspeedValue);
    weatherInformation.appendChild(windspeedDiv);

    // Wetterinformationen zum Hauptcomponent hinzufügen
    weatherComponent.appendChild(weatherInformation);


    const weatherView = document.querySelector('.weather-view');

    weatherView.appendChild(weatherComponent);

}

function renderWeatherComponents(data) {
    for (let i = 0; i < 3; i++) {
        generateWeatherComponent(days[new Date(data.days[i].dateTime).getDay()].toUpperCase(), ((data.days[i].temp - 32) * 5 / 9).toFixed(1), data.days[i].humidity, data.days[i].windSpeed, weatherImages[data.days[i].conditions]);
    }
}



function createWeatherObject(weatherJson) {

    return ({
        "city": weatherJson.resolvedAddress, "desc": weatherJson.description, "days": {
            "0": {
                "dateTime": weatherJson.days[0].datetime,
                "conditions": weatherJson.days[0].conditions,
                "humidity": weatherJson.days[0].humidity,
                "temp": weatherJson.days[0].temp,
                "windSpeed": weatherJson.days[0].windspeed,
            },
            "1": {
                "dateTime": weatherJson.days[1].datetime,
                "conditions": weatherJson.days[1].conditions,
                "humidity": weatherJson.days[1].humidity,
                "temp": weatherJson.days[1].temp,
                "windSpeed": weatherJson.days[1].windspeed,
            },
            "2": {
                "dateTime": weatherJson.days[2].datetime,
                "conditions": weatherJson.days[2].conditions,
                "humidity": weatherJson.days[2].humidity,
                "temp": weatherJson.days[2].temp,
                "windSpeed": weatherJson.days[2].windspeed,
            },

        }
    })

}


function inputFieldFunction() {
    const domElements = getDom();

    domElements.searchBar.addEventListener("keydown", (event) => {
        if (event.key === 'Enter') {

            domElements.searchView[0].textContent = "";
            showWeather(domElements.searchBar.value, domElements);
        }
    })
}


async function getWeatherDataFromApi(city) {
    const apiKey = "XT56GNF3GWHBFCPHT2D7PFWTF";

    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${apiKey}`);

    if (!response.ok) {
        throw new Error("Error in fetching data from api!")
    }




    const data = createWeatherObject(await response.json());


    return data;
}

async function showWeather(city, domElements) {
    try {
        const data = await getWeatherDataFromApi(city);
        domElements.weatherPrediction[0].textContent = data.desc;
        domElements.searchedLocation[0].textContent = data.city;
        renderWeatherComponents(data);
    } catch (error) {
        console.error(error);
    }

}

inputFieldFunction();









