'use strict';

const posts = require('../routes/posts');

module.exports = {
  posts: { path: "/posts", router: posts }
};