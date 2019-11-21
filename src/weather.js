import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWeatherCity } from "./actions";

export default function Weather() {
    const [userInput, setUserInput] = useState("");
    const dispatch = useDispatch();

    const weatherCity = useSelector(state => state && state.weather_city);

    useEffect(() => {
        if (weatherCity) {
            if (weatherCity.notfound) {
                document.getElementById(
                    "weather-container"
                ).style.backgroundImage = `/bg.jpg`;
            } else {
                document.getElementById(
                    "weather-container"
                ).style.backgroundImage = `url(${weatherCity.imageUrl}`;
            }
        }
        setUserInput("");
    }, [weatherCity]);

    const handleClick = e => {
        if (e.key == "Enter") {
            console.log(userInput);
            dispatch(getWeatherCity(userInput));
        }
    };

    return (
        <div id="weather-container">
            <div className="inweather">
                <input
                    value={userInput}
                    placeholder="Enter a city..."
                    type="text"
                    onChange={e => setUserInput(e.target.value)}
                    onKeyDown={e => {
                        handleClick(e);
                    }}
                />
                {weatherCity && weatherCity.notfound && (
                    <p className="weather">Sorry, not found</p>
                )}
                {weatherCity && !weatherCity.notfound && (
                    <div className="weather">
                        <p>
                            It´s{" "}
                            <strong>{weatherCity.weather.main.temp}°C</strong>{" "}
                            in <strong>{weatherCity.weather.name}</strong>,
                            {weatherCity.weather.sys.country}
                        </p>
                        <img
                            src={`/${weatherCity.weather.weather[0].icon}.png`}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

// <img src={weatherCity.imageUrl} />;
