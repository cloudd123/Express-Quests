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
app.put("/api/movies/:id", movieHandlers.updateMovie);
app.put("/api/movies/:id", userHandlers.updateUser);
app.delete("/api/movies/:id", movieHandlers.deleteMovie);
app.delete("/api/users/:id", userHandlers.deleteUser);


app.post("/api/users", async (req, res) => {
  try {
    const { username, email } = req.body; // Assuming your request body has 'username' and 'email' fields

    const [result] = await database.execute(
      "INSERT INTO users (username, email) VALUES (?, ?)",
      [username, email]
    );

    res.status(201).json({ message: "User created successfully", insertedId: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating user" });
  }
});

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
