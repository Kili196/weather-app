function createWeatherObject(weatherJson) {
    return ({ "city": weatherJson.resolvedAddress, "desc": weatherJson.description, "curr_conditions": weatherJson.currentConditions.conditions, "humidity": weatherJson.currentConditions.humidity })

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

async function showWeather() {
    const data = await getWeatherDataFromApi("London");
    console.log(data)
}

showWeather();





