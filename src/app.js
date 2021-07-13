"use strict";
const express = require("express");
const compression = require("compression")
const path = require('path')
const app = express();
const _app_folder = 'UI/dist/AquarinoidUI';
const port = 8080;


app.use(compression());

app.get('*.*', express.static(_app_folder, {maxAge: '1y'}));


app.all('*', function (req, res) {
    res.status(200).sendFile(`/`, {root: _app_folder});
});

app.listen(port, function () {
    console.log("Node Express server for " + app.name + " listening on http://localhost:" + port);
});
