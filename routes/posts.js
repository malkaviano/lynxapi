'use strict';

const express = require('express'),
      router = express.Router({mergeParams: true}),
      queries = require('../lib/queries'),
      posts = require('../lib/posts');

function registerRoutes() {
  router.get('/', (req, res) => {
    posts.getPosts(
      results => {
        res.render('posts/posts', {
          collection: results,
          helpers: { json: function (context) { return JSON.stringify(context); } }
        })
      },
      error => {
        res.send(`An error occurred: ${error}`);
      }
    );
  });

  router.get('/queries', (req, res) => {
    res.render('posts/queries');
  });

  router.get('/:id', (req, res) => {
    posts.postInfo(req.params.id,
      results => {
        res.render('posts/post', {
          user: results[0].body,
          post: results[2].body,
          comments: results[1].body,
          helpers: { json: function (context) { return JSON.stringify(context); } }
        })
      },
      error => {
        res.send('An error occurred');
      });
  });

  router.post('/queries', (req, res) => {
    const id = req.body.id;
    const option = req.body.query;    

    console.log(option);

    const promise = queries[option](id);

    promise.then(result => {
      console.log(result.body);

      res.json(result.body);
    }).catch(error => {
      console.log(error);

      res.send(err.status);
    });
  });

  return router;
}

module.exports = registerRoutes();