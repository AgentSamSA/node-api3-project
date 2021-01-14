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
});

module.exports = server;
