'use strict';

const exphbs = require('express-handlebars');

module.exports = {
  config: function() {
    return exphbs(
      {
        defaultLayout: 'main' 
      }
    );
  },
  name: 'handlebars'
};