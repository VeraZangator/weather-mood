import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getForecast } from "./actions";

export default function Forecast() {
    const dispatch = useDispatch();

    const city = useSelector(state => state && state.weather_city);
    const forecast = useSelector(state => state && state.forecast);

    useEffect(() => {
        dispatch(getForecast(city.weather.name));

        document.getElementById(
            "forecast-container"
        ).style.backgroundImage = `url(${city.imageUrl}`;
    }, []);
    console.log("forecast obj", forecast);
    if (forecast) {
        console.log("icono", forecast.forecast.list[0].weather[0].icon);
        console.log(forecast.forecast.list[8].weather[0].icon);
    }

    return (
        <div id="forecast-container">
            <div className="forecast">
                <h1 className="city"> {city.weather.name} </h1>
                {forecast && (
                    <div className="forecast-table">
                        <div>
                            <h2>{forecast.obj.today_info[0]}</h2>
                            <p>Max: {forecast.obj.today_info[1]}°</p>
                            <p>Min: {forecast.obj.today_info[2]}°</p>
                            <img
                                src={`/${forecast.forecast.list[0].weather[0].icon}.png`}
                            />
                        </div>
                        <div>
                            <h2>{forecast.obj.nxt_info[0]}</h2>
                            <p>Max: {forecast.obj.nxt_info[1]}°</p>
                            <p>Min: {forecast.obj.nxt_info[2]}°</p>
                            <img
                                src={`/${forecast.forecast.list[8].weather[0].icon}.png`}
                            />
                        </div>
                        <div>
                            <h2>{forecast.obj.nxt2_info[0]}</h2>
                            <p>Max: {forecast.obj.nxt2_info[1]}°</p>
                            <p>Min: {forecast.obj.nxt2_info[2]}°</p>
                            <img
                                src={`/${forecast.forecast.list[16].weather[0].icon}.png`}
                            />
                        </div>
                        <div>
                            <h2>{forecast.obj.nxt3_info[0]}</h2>
                            <p>Max: {forecast.obj.nxt3_info[1]}°</p>
                            <p>Min: {forecast.obj.nxt3_info[2]}°</p>
                            <img
                                src={`/${forecast.forecast.list[24].weather[0].icon}.png`}
                            />
                        </div>
                        <div>
                            <h2>{forecast.obj.nxt4_info[0]}</h2>
                            <p>Max: {forecast.obj.nxt4_info[1]}°</p>
                            <p>Min: {forecast.obj.nxt4_info[2]}°</p>
                            <img
                                src={`/${forecast.forecast.list[32].weather[0].icon}.png`}
                            />
                        </div>
                    </div>
                )}
                <Link to="/"> Go back </Link>
            </div>
        </div>
    );
}
