const express = require("express");
const app = express();
const compression = require("compression");
const request = require("request");
const argv = require("yargs").argv;
const secrets = require("./secrets.json");

app.use(compression());

app.use(
    express.urlencoded({
        extended: false
    })
);

app.use(express.json());
app.use(express.static("./public"));

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.get("/weather/:input", (req, res) => {
    let owmKey = secrets.OWM_KEY;
    let pixKey = secrets.PIX_KEY;
    let city = argv.c || req.params.input;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${owmKey}`;
    let imageUrl;
    request(url, function(err, response, body) {
        if (err) {
            console.log("error:", err);
            res.sendStatus(500);
        } else {
            let weather = JSON.parse(body);
            console.log(weather);
            if (weather.message) {
                res.json({ notfound: true });
            } else {
                request(
                    `https://pixabay.com/api/?key=${pixKey}&q=${city}&image_type=photo`,
                    function(err, response, body) {
                        imageUrl = "/bg.jpg";
                        if (err) {
                            console.log("error:", err);
                            res.json({ weather, imageUrl });
                        } else {
                            let image = JSON.parse(body);
                            if (image.total >= 1) {
                                imageUrl =
                                    image.hits[Math.floor(Math.random() * 4)]
                                        .largeImageURL;
                                res.json({ weather, imageUrl });
                            } else {
                                imageUrl = "/bg.jpg";
                                res.json({ weather, imageUrl });
                            }
                        }
                    }
                );
            }
        }
    });
});

app.get("/forecast/:city", (req, res) => {
    let owmKey = secrets.OWM_KEY;
    let pixKey = secrets.PIX_KEY;
    let city = argv.c || req.params.city;
    let url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${owmKey}`;
    let imageUrl;
    console.log("paramscity", req.params.city);
    console.log("city", city);
    console.log("argv", argv.c);
    request(url, function(err, response, body) {
        if (err) {
            console.log("error:", err);
            res.sendStatus(500);
        } else {
            let forecast = JSON.parse(body);
            if (forecast.message) {
                res.json({ notfound: true });
            } else {
                console.log("this is forecast", forecast);
                let tdy = [];
                let nxt = [];
                let nxt2 = [];
                let nxt3 = [];
                let nxt4 = [];
                let nxt5 = [];
                let obj = {};
                // let obj2 = {};
                // obj2.obj_array = [];
                // let obj_person = {};
                for (var i = 0; i < forecast.list.length; i++) {
                    console.log(forecast.list.length);
                    console.log(forecast.list[i].weather);
                    let time = forecast.list[i].dt_txt.split(" ");
                    let correct_time = time[0].split("-");
                    let ok_time = correct_time[2] + "/" + correct_time[1];
                    let day = time[0].split("-");
                    console.log(day);
                    let today = forecast.list[0].dt_txt.split(" ");
                    let today_day = today[0].split("-");
                    if (today_day[2] == day[2]) {
                        tdy.push(forecast.list[i].main.temp_max);
                        tdy.push(forecast.list[i].main.temp_min);
                        obj.today_info = [];
                        obj.today_info.push(ok_time);
                        obj.today_info.push(Math.max.apply(null, tdy));
                        obj.today_info.push(Math.min.apply(null, tdy));
                        // obj_person.date = time[0];
                        // obj_person.max = Math.max.apply(null, tdy);
                        // obj_person.min = Math.max.apply(null, tdy);
                        // obj2.obj_array.push(obj_person);
                        // console.log("a ver", obj2);
                    } else if (Number(today_day[2]) + 1 == Number(day[2])) {
                        nxt.push(forecast.list[i].main.temp_max);
                        nxt.push(forecast.list[i].main.temp_min);
                        obj.nxt_info = [];
                        obj.nxt_info.push(ok_time);
                        obj.nxt_info.push(Math.max.apply(null, nxt));
                        obj.nxt_info.push(Math.min.apply(null, nxt));
                    } else if (Number(today_day[2]) + 2 == Number(day[2])) {
                        nxt2.push(forecast.list[i].main.temp_max);
                        nxt2.push(forecast.list[i].main.temp_min);
                        obj.nxt2_info = [];
                        obj.nxt2_info.push(ok_time);
                        obj.nxt2_info.push(Math.max.apply(null, nxt2));
                        obj.nxt2_info.push(Math.min.apply(null, nxt2));
                    } else if (Number(today_day[2]) + 3 == Number(day[2])) {
                        nxt3.push(forecast.list[i].main.temp_max);
                        nxt3.push(forecast.list[i].main.temp_min);
                        obj.nxt3_info = [];
                        obj.nxt3_info.push(ok_time);
                        obj.nxt3_info.push(Math.max.apply(null, nxt3));
                        obj.nxt3_info.push(Math.min.apply(null, nxt3));
                    } else if (Number(today_day[2]) + 4 == Number(day[2])) {
                        nxt4.push(forecast.list[i].main.temp_max);
                        nxt4.push(forecast.list[i].main.temp_min);
                        obj.nxt4_info = [];
                        obj.nxt4_info.push(ok_time);
                        obj.nxt4_info.push(Math.max.apply(null, nxt4));
                        obj.nxt4_info.push(Math.min.apply(null, nxt4));
                    } else if (Number(today_day[2]) + 5 == Number(day[2])) {
                        nxt5.push(forecast.list[i].main.temp_max);
                        nxt5.push(forecast.list[i].main.temp_min);
                        obj.nxt5_info = [];
                        obj.nxt5_info.push(ok_time);
                        obj.nxt5_info.push(Math.max.apply(null, nxt5));
                        obj.nxt4_info.push(Math.min.apply(null, nxt5));
                    }
                }
                console.log("chan?", obj);
                request(
                    `https://pixabay.com/api/?key=${pixKey}&q=${city}&image_type=photo`,
                    function(err, response, body) {
                        imageUrl = "/bg.jpg";
                        if (err) {
                            console.log("error:", err);
                            res.json({ forecast, imageUrl });
                        } else {
                            let image = JSON.parse(body);
                            if (image.total >= 1) {
                                imageUrl =
                                    image.hits[Math.floor(Math.random() * 4)]
                                        .largeImageURL;
                                res.json({ obj, forecast, imageUrl });
                            } else {
                                imageUrl = "/bg.jpg";
                                res.json({ obj, forecast, imageUrl });
                            }
                        }
                    }
                );
            }
        }
    });
});

//**NEVER DELETE**NEVER DELETE**NEVER DELETE
app.get("*", function(req, res) {
    console.log(req.params["0"]);
    res.sendFile(__dirname + "/index.html");
});
//**NEVER DELETE**NEVER DELETE**NEVER DELETE

app.listen(process.env.PORT || 8080, function() {
    console.log("I'm listening.");
});
