'use strict';

const request = require('superagent');

const users = function(id) {
  const url = `https://jsonplaceholder.typicode.com/users/${id}`;

  return requestUrl(url);
};

const posts = function(id) {
  const url = `https://jsonplaceholder.typicode.com/posts/${id}`;

  return requestUrl(url);
};

const comments = function(id) {
  const url = `https://jsonplaceholder.typicode.com/posts/${id}/comments`;

  return requestUrl(url);
};

const commentsQS = function(id) {
  const url = `https://jsonplaceholder.typicode.com/comments?postId=${id}`;

  return requestUrl(url);
};

const allPosts = function() {
  const url = `https://jsonplaceholder.typicode.com/posts`;

  return requestUrl(url);
};

function requestUrl(url) {
  return request.get(url)
                .set('Accept', 'application/json');
}

module.exports = {
  users,
  posts,
  comments,
  commentsQS,
  allPosts
};