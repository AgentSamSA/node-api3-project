const Users = require("../users/users-model");
const Posts = require("../posts/posts-model");

function logger(req, res, next) {
  console.log(req.method);
  console.log(req.url);
  console.log(Date.toISOString());
  next();
}

async function validateUserId(req, res, next) {
  console.log("Checking if user id is valid");

  try {
    const user = await Users.getById(req.params.id);
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(404).json({ message: "user not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "error retreiving user data" });
  }
}

function validateUser(req, res, next) {
  console.log("Checking that user data is valid");

  if (!req.body) {
    res.status(400).json({ message: "missing user data" });
  } else if (!req.body.name) {
    res.status(400).json({ message: "missing required name field" });
  } else {
    next();
  }
}

async function validatePostId(req, res, next) {
  console.log("Checking if post id is valid");

  try {
    const post = await Posts.getById(req.params.id);
    if (post) {
      req.post = post;
      next();
    } else {
      res.status(404).json({ message: "post not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "error retreiving post data" });
  }
}

function validatePost(req, res, next) {
  console.log("Checking if post data is valid");

  if (!req.body) {
    res.status(400).json({ message: "missing post data" });
  } else if (!req.body.text) {
    res.status(400).json({ message: "missing required text field" });
  } else {
    next();
  }
}

module.exports = { logger, validateUserId, validateUser, validatePostId, validatePost };
