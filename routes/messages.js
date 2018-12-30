/*
To do:
utilize sequlize
create greeter class
use restclient to get drata from shine test api
  curl -X POST \
     -H "Content-Type: application/json" \
     -d '{"goal":"be more joyful"}' \
     https://shine-se-test-api.herokuapp.com/
*/



var express = require('express');
var router = express.Router();
var pry = require('pryjs')


/* GET message. */
router.get('/', function(req, res, next) {
  res.send('you must "post" a request');
});



/*
  Because this app is so simple we are passing user & goal, rathet than the user id.  This is also because
  for the majority of the app, the data is in memory and not saved yet
*/
router.post('/', function(req, res, next) {
  // eval(pry.it
  // putting these into variables, because if this were to extended these values may have to be cleansed. for instance
  // the goal should be joy, not JoY or joy!!!!!!!!!
  let name = req.body.name;
  let goal = req.body.goal;

  //VERY basic state machine.  to improve quality of each conversation at each state, a service object could be created
  switch(req.body.state) {
    case "greetings":
      res.json({ messsage: "FIX THIS ASAP!!!!!! Greetings!", nextState: "nameLookup" })
      break;
    case "nameLookup":
      if (false)
        res.json({
          messsage: `Hi ${name}! Welcome back! you said before you wanted to work on: ${goal}. What do you want to work on now?`,
          name: name,
          goal: goal,
          nextState: "goalLookup"
        });
      else
        res.json({
          messsage: `Hi, ${name} Whats one thing you want to work on?`,
          name: name,
          nextState: "goalLookup"
        });
      break;
    case "goalLookup":
      res.json({
        message: `So you want to work on ${goal}. Does that sound right, ${name}?`,
        name: name,
        goal: goal,
        nextState: "confirmGoal"
      });
      break;
    case "confirmGoal":
      //if we want to submit
      if (false) //truthy values
        // save to the db
        // fetch the goal
        res.json({
          messsage: `Great! Heres a daily dose of Shine to get you started {contentFromAPi}`,
          name: name,
          goal: goal,
          nextState: "complete"
        })
      else
        res.json({
          messsage: `No problem, ${name}! Let's try again. What's one thing you want to work on?`,
          name: name,
          nextState: "goalLookup"
        });
      break;
    default: 
      res.json({ messsage: "I got confused lets start over. Whats your name", nextState: "nameLookup"  })
  }
});



module.exports = router;
