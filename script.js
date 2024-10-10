

function getDom() {
    const container = document.querySelector('.container');
    const searchBar = document.querySelector('.search-bar');
    const weatherView = document.querySelector('.weather-view');
    const headings = document.querySelectorAll('h1');

    return {
        container,
        searchBar,
        weatherView,
        headings
    };
}



function createWeatherObject(weatherJson) {


    return ({
        "city": weatherJson.resolvedAddress, "desc": weatherJson.description, "days": {
            "0": {
                "conditions": weatherJson.days[0].conditions,
                "humidity": weatherJson.days[0].humidity,
                "temp": weatherJson.days[0].temp,
                "wind-speed": weatherJson.days[0].windspeed,
            },
            "1": {
                "conditions": weatherJson.days[1].conditions,
                "humidity": weatherJson.days[1].humidity,
                "temp": weatherJson.days[1].temp,
                "wind-speed": weatherJson.days[1].windspeed,
            },
            "2": {
                "conditions": weatherJson.days[2].conditions,
                "humidity": weatherJson.days[2].humidity,
                "temp": weatherJson.days[2].temp,
                "wind-speed": weatherJson.days[2].windspeed,
            },

        }
    })

}


function inputFieldFunction() {
    const domElements = getDom();

    domElements.searchBar.addEventListener("keydown", (event) => {
        if (event.key === 'Enter') {
            showWeather(domElements.searchBar.value);
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

async function showWeather(city) {
    try {
        const data = await getWeatherDataFromApi(city);
        console.log(data)
    } catch (error) {
        console.error(error);
    }

}

inputFieldFunction();







