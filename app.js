require("dotenv").config();

const mysql = require("mysql2/promise");
const express = require("express");
const movieHandlers = require("./movieHandlers"); // Make sure the path to movieHandlers is correct
const userHandlers = require("./userHandlers")

const app = express();
const port = process.env.APP_PORT || 5000; // Use the port from the environment variable if available

app.get("/", (req, res) => {
  res.send("Welcome to my favorite movie list");
});

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.get("/api/users", userHandlers.getUsers);
app.get("/api/users/:id", userHandlers.getUserById);
app.post("/api/users/:id", userHandlers.postUser);
app.post("/api/movies/:id", movieHandlers.postMovie);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
