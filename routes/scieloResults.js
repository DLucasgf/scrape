var express = require('express');
var router = express.Router();

/* GET scieloResults listing. */
router.get('/', function(req, res, next) {
  res.send('Why so serious? v2');
});

module.exports = router;
