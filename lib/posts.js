'use strict';

const queries = require('../lib/queries');

function getPosts(success, error) {
  const collection = {};
  const userPromises = [];
  queries['allPosts']().then(result => {
    const posts = result.body;
    

    posts.forEach(post => {
      if (collection[post.userId] === undefined) {
        collection[post.userId] = {};
        collection[post.userId].posts = {};

        userPromises.push(queries['users'](post.userId));
      }

      queries['comments'](post.id).then(commentsJson => {
        collection[post.userId].posts[post.id] = { 'post': post };
        collection[post.userId].posts[post.id].comments = commentsJson.body;
      });
    });

    Promise.all(userPromises).then(json => {
      json.forEach(userJson => {
        const user = userJson.body;
  
        collection[user.id].user = { 'user': user };
      });

      success(collection);
    });
  }).catch(err => {
    console.log(err);

    error(err);
  });
}

function postInfo(id, success, error) {
  queries['posts'](id).then(result => {
    const post = result.body;

    const userId = post.userId;

    const userPromise = queries['users'](userId);
    const commentsPromise = queries['comments'](id);

    Promise.all([ userPromise, commentsPromise ]).then(results => {
      console.log("Success");

      results.push(post);

      success(results);
    }).catch(reason => {
      console.log(reason);

      error(reason);
    });
  }).catch(err => {
    console.log(err);

    error(err);
  });
}

module.exports = {
  postInfo,
  getPosts
};