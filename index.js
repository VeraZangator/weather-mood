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
    let owmKey = secrets.OWM_KEY || process.env.OWM_KEY;
    let pixKey = secrets.PIX_KEY || process.env.PIX_KEY;
    let city = argv.c || req.params.input;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${owmKey}`;
    let imageUrl;
    request(url, function(err, response, body) {
        if (err) {
            console.log("error:", err);
            res.sendStatus(500);
        } else {
            let weather = JSON.parse(body);
            if (weather.message) {
                res.json({ notfound: true });
            } else {
                request(
                    `https://pixabay.com/api/?key=${pixKey}&q=${city}&image_type=photo`,
                    function(err, response, body) {
                        if (err) {
                            console.log("error:", err);
                            res.json({ weather });
                        } else {
                            let image = JSON.parse(body);
                            console.log("the images", image);
                            console.log(image.total);
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

//**NEVER DELETE**NEVER DELETE**NEVER DELETE
app.get("*", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});
//**NEVER DELETE**NEVER DELETE**NEVER DELETE

app.listen(process.env.PORT || 8080, function() {
    console.log("I'm listening.");
});
