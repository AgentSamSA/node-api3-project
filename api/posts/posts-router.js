const express = require('express');

const Posts = require("./posts-model");

const router = express.Router();

const { valdiatePostId, validatePost } = require("../middleware/middleware");

router.get('/', (req, res, next) => {
  Posts.get()
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(next)
});

router.get('/:id', valdiatePostId, (req, res) => {
  res.status(200).json(req.post);
});

router.delete('/:id', validatePostId, (req, res, next) => {
  Posts.remove(req.params.id)
    .then(count => {
      res.status(200).json({ message: "The post has been nuked" });
    })
    .catch(next);
});

router.put('/:id', validatePostId, validatePost, (req, res, next) => {
  Posts.update(req.params.id, req.body)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(next);
});

router.use((err, req, res, next) => {
  res.status(500).json({
    info: "something went wrong inside the posts router",
    message: err.message,
    stack: err.stack
  });
});

module.exports = router;
