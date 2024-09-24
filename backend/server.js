const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
// [SH] Require Passport
var passport = require("passport");
const createError = require("http-errors");

// [SH] Bring in the data model
// require("./api/models/db");
// [SH] Bring in the Passport config after model is defined
require("./config/passport");

// Connecting with mongo db
mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://127.0.0.1:27017/mydatabase", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    (x) => {
      console.log(
        `Connected to Mongo! Database name: "${x.connections[0].name}"`
      );
    },
    (error) => {
      console.log("Database could not connected: " + error);
    }
  );

// [SH] Bring in the routes for the API (delete the default routes)
var routesApi = require("./routes/index");

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cors());

// [SH] Initialise Passport before using the route middleware
app.use(passport.initialize());

// [SH] Use the API routes when path starts with /api
app.use("/api", routesApi);

//app.use(express.static(path.join(__dirname, 'dist/mean-stack-crud-app')))
//app.use('/', express.static(path.join(__dirname, 'dist/mean-stack-crud-app')))

// Setting up port with express js
// Create port
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log("Connected to port " + port);
});
// Find 404 and hand over to error handler
app.use((req, res, next) => {
  next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
  console.log("err", err);
  console.error(err.message); // Log error message in our server's console
  if (!err.statusCode) err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
  res.status(err.statusCode).send(err.message); // All HTTP requests must have a response, so let's send back an error with its status code and message
});
