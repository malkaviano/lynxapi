'use strict';

if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express'),
      app = express(),
      path = require('path'),
      viewEngine = require('./config/handlebars'),
      routes = require('./config/routes'),
      helmet = require('helmet'),
      port = process.env.PORT
;

app.use(helmet());

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.engine(viewEngine.name, viewEngine.config());
app.set('view engine', viewEngine.name);

for(const name in routes) {
  app.use(routes[name].path, routes[name].router);
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});


/*
const express = require('express'),
      app = express(),
      path = require('path'),
      bodyParser = require('body-parser'),
      request = require('superagent'),
      port = process.env.PORT
;

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/search/:query', function(req, res) {
  const url = `https://api.gettyimages.com/v3/search/images`;

  request.get(url)
    .query({ phrase: req.params.query })
    .set('Api-Key', process.env.API_KEY)
    .end((err, result) => {
      if(err) {
        console.log(`Error: ${err}`);

        return;
      }

      res.send(result.body.images.map(item => (
          { 
            id: item.id,
            title: item.title, 
            price: 9.99,
            link: item.display_sizes[0].uri
          }
        ))
      );
    });
});
*/