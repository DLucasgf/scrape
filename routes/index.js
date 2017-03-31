var express = require('express');
var sleep = require('sleep');
var url = require('url');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  var i = 0;
  while (i < 10) {

    //console.log('Why so serious? ' + i);
    //sleep.msleep(500);

    i++;
  }

  var articleUrl = "http://www.scielo.org.mx/scielo.php?script=sci_arttext&pid=S2007-249X2016000200060&lang=pt";
  

  var tmp = url.parse(articleUrl, true);
  console.log('tmp');
  console.log(tmp);
  var pid = tmp.query.pid;
  console.log('pid');
  console.log(pid);

  res.render('index', { title: 'Express' });
});

module.exports = router;
