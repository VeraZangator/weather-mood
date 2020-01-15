import axios from "axios";

export async function getWeatherCity(userInput) {
    const { data } = await axios.get(`/weather/${userInput}`);
    console.log("DATS EN ACTION", data);
    return {
        type: "GET_WEATHER_CITY",
        weather: data
    };
}

export async function getForecast(city) {
    const { data } = await axios.get(`/forecast/${city}`);
    console.log("DATS EN ACTION", data);
    return {
        type: "GET_FORECAST",
        forecast: data
    };
}
