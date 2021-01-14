const express = require('express');

const router = express.Router();

const Users = require("./users-model");
const Posts = require("../posts/posts-model");

const { validateUserId, validateUser, validatePost } = require("../middleware/middleware");

router.post('/', validateUser, (req, res, next) => {
  Users.insert(req.body)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(next);
});

router.get('/', (req, res, next) => {
  Users.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(next);
});

router.get('/:id', validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

router.delete('/:id', validateUserId, (req, res, next) => {
  Users.remove(req.params.id)
    .then(count => {
      res.status(200).json({ message: "the user has been nuked" });
    })
    .catch(next);
});

router.put('/:id', validateUserId, validateUser, (req, res, next) => {
  Users.update(req.params.id, req.body)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(next);
});

router.post('/:id/posts', validateUserId, validatePost, (req, res, next) => {
  const postInfo = { ...req.body, user_id: req.params.id }

  Posts.insert(postInfo)
    .then(post => {
      res.status(210).json(post);
    })
    .catch(next);
});

router.get('/:id/posts', validateUserId, (req, res, next) => {
  Users.getUserPosts(req.params.id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(next);
});

router.use((err, req, res, next) => {
  res.status(500).json({
    info: "something went wrong inside the users router",
    message: err.message,
    stack: err.stack
  });
});

module.exports = router;
