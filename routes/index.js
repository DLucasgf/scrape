var express = require('express');
var sleep = require('sleep');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  var i = 0;
  while (i < 10) {

    console.log('Why so serious? ' + i);
    sleep.msleep(500);

    i++;
  }
  
  res.render('index', { title: 'Express' });
});

module.exports = router;
