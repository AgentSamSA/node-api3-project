function logger(req, res, next) {
  // do your magic!
  console.log(req.method);
  console.log(req.url);
  console.log(Date.toISOString());
  next();
}

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePostId(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

// do not forget to expose these functions to other modules
