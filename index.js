const express = require("express");
const app = express();
const compression = require("compression");
const cookieSession = require("cookie-session");
const csurf = require("csurf");
const request = require("request");
const argv = require("yargs").argv;
const secrets = require("./secrets.json");

app.use(compression());

const cookieSessionMiddleware = cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 90
});

app.use(cookieSessionMiddleware);

app.use(
    express.urlencoded({
        extended: false
    })
);

app.use(express.json());
app.use(express.static("./public"));
app.use(csurf());

app.use((req, res, next) => {
    res.set("x-frame-options", "DENY");
    res.cookie("mytoken", req.csrfToken());
    next();
});

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
    let apiKey = secrets.OWM_KEY;
    let city = argv.c || req.params.input;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
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
                    `https://pixabay.com/api/?key=${secrets.PIX_KEY}&q=${city}&image_type=photo`,
                    function(err, response, body) {
                        if (err) {
                            console.log("error:", err);
                            res.json({ weather });
                        } else {
                            let image = JSON.parse(body);
                            if (image.total >= 3) {
                                imageUrl = image.hits[2].largeImageURL;
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

app.listen(8080, function() {
    console.log("I'm listening.");
});
