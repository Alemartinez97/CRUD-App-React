const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const config = require("config");
const { connect, knex } = require("./db");

const personRouter = require("./routes/person");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.set("etag", false);

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(async function(req, _res, next) {
  const token = req.headers.user_token;
  if (token) {
    const user = await knex("user")
      .select("*")
      .where({ token })
      .first();
    req.user = user;
  }
  next();
});

app.use("/person", personRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

const port = config.get("server.port") || 3000;

connect()
  .then(() => {
    app.listen(port, function() {
      console.log(`Server listening on port ${port}!`);
    });
  })
  .catch(err => {
    console.log("Cannot connect to db", err);
  });

module.exports = app;
