import axios from "./axios";

export async function getWeatherCity(userInput) {
    const { data } = await axios.get(`/weather/${userInput}`);
    console.log("DATS EN ACTION", data);
    return {
        type: "GET_WEATHER_CITY",
        weather: data
    };
}
