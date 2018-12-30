var express = require('express');
var router = express.Router();
var pry = require('pryjs')


/* GET message. */
router.get('/', function(req, res, next) {
  res.send('you must "post" a request');
});


router.post('/', function(req, res, next) {
  // eval(pry.it
  // putting these into variables, because if this were to extended these values may have to be cleansed
  let name = req.body.name;
  let goal = req.body.goal;

  //VERY basic state machine.  to improve quality of each conversation at each state, a service object could be created
  switch(req.body.state) {
    case "greetings":
      res.json({ messsage: "FIX THIS ASAP!!!!!! Greetings!", next_state: "nameLookup" })
    case "nameLookup":
      if (false)
        res.json({
          messsage: "Hi {name}! Welcome back! you said before you wanted to work on: {goal}. What do you want to work on now?",
          name: name,
          goal: goal,
          next_state: "goalLookup"
        });
      else
        res.json({
          messsage: "Hi, {name}! What's one thing you want to work on?",
          name: name,
          next_state: "goalLookup"
        })
      break;
    case "goalLookup":
      res.json({
        message: "So you want to work on {goal}. Does that sound right, {name}?",
        name: name,
        goal: goal,
      })
    // case undefined:
    //   res.json({ messsage: "I'm confused" },
    //     name: name,
    //     goal: goal,
    //   );
    //   break;
    default: 
      res.json({ messsage: "I got confused let's start over. What's your name", next_state: "nameLookup"  })
  }
});



module.exports = router;
