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