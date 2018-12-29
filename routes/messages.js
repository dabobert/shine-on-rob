var express = require('express');
var router = express.Router();

/* GET message. */
router.get('/', function(req, res, next) {
  if (req.query.input)
    res.json({
      value: req.query.input
    })
  else
    res.send('this is a start');
});

module.exports = router;
