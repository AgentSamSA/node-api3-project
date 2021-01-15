const express = require('express');
const usersRouter = require("./users/users-router");
const postsRouter = require("./posts/posts-router");

const { logger } = require("./middleware/middleware");

const server = express();

server.use(express.json());

server.use("/api/users", logger, usersRouter);
server.use("/api/posts", logger, postsRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
  res.status(200).json({ message: "api is up and running", env: process.env.NODE_ENV });
});

module.exports = server;
