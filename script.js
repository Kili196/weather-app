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
    return ({ "city": weatherJson.resolvedAddress, "desc": weatherJson.description, "curr_conditions": weatherJson.currentConditions.conditions, "humidity": weatherJson.currentConditions.humidity })

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







