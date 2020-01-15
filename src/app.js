import React from "react";
import Weather from "./weather";
import Forecast from "./forecast";
import { BrowserRouter, Route } from "react-router-dom";

export default function App() {
    return (
        <React.Fragment>
            <div className="logo">
                {" "}
                <img src="/weather_logo.png" />
                <img src="/pixabay_logo.png" />
            </div>
            <BrowserRouter>
                <Route exact path="/" render={() => <Weather />} />
                <Route
                    exact
                    path="/forecast/:city"
                    render={() => <Forecast />}
                />
            </BrowserRouter>
        </React.Fragment>
    );
}

// <div className="hero-bkg-animated">
// </div>
// <h1>HONEYCOMB</h1>
// <iframe
// src="https://giphy.com/embed/6Egwo6KTGUtIsd3bzx"
// width="480"
// height="236"
// frameBorder="0"
// className="giphy-embed"
// allowFullScreen
// ></iframe>

//
