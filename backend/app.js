const express = require("express");
const bodyParser = require("body-parser");
const appRouter = require("./routes");
const logMiddleware = require("./middlewares/log");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(logMiddleware); //build log before start process

app.use(appRouter); //crud todos

app.listen(4000);
