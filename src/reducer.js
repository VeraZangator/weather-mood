export function reducer(state = {}, action) {
    if (action.type == "GET_WEATHER") {
        console.log("this are in the reducer", action.weather);
        state = {
            ...state,
            weather: action.weather
        };
    }

    if (action.type == "GET_WEATHER_CITY") {
        console.log("EN REDUUUUCRE", action);
        state = {
            ...state,
            weather_city: action.weather
        };
    }

    return state;
}
