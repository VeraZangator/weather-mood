const express = require("express");
const app = express();

app.use(require("./build.js"));

app.listen(process.env.PORT || 8081, () =>
    console.log(`Ready to compile and serve bundle.js`)
);
