const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const morgan = require("morgan");
const routes = require('./routes/routes')

app.use(cors());

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use(morgan("dev"));
routes(app);
console.log(process.env.DB_USER);

app.get("*", (req, res) => {
  res.status(400).send({
    message: "No se encuentra el recurso"
  });
});

//seteamos el puerto en el cual va a escuchar los pedidos la aplicación
var puerto = "8080";

app.listen(puerto, function() {
  console.log("Escuchando en el puerto " + puerto);
});
