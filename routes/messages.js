var express = require('express');
var router = express.Router();
var pry = require('pryjs')




/* GET message. */
router.get('/', function(req, res, next) {
  res.send('you must "post" a request');
});


router.post('/', function(req, res, next) {
// eval(pry.it)
  switch(req.body.state) {
    case "after_introduction":
      res.json({ messsage: "let me look you up"});
      break;
    case undefined:
      res.json({ messsage: "I'm confused" });
      break;
    default: 
      res.json({ messsage: 'this the start' })
  }



  // if (req.query.input)
  //   res.json({
  //     value: req.query.input
  //   })
  // else
  //   res.send('this is a start');
});




module.exports = router;
