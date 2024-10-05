

async function getWeatherDataFromApi(city) {
    const apiKey = "XT56GNF3GWHBFCPHT2D7PFWTF";

    const data = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${apiKey}`);

}