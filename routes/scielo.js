var express = require('express');
var router = express.Router();

/* GET scielo listing. */
router.get('/', function(req, res, next) {
  res.send('Why so serious?');
});

module.exports = router;
