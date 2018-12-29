var express = require('express');
var router = express.Router();

/* GET message. */
router.get('/', function(req, res, next) {
  res.send('this is a start');
});

module.exports = router;
