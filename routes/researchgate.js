var express = require('express');
var router = express.Router();

/* GET scielolist listing. */
router.get('/', function(req, res, next) {
  res.send('Research Gate?');
});

module.exports = router;
