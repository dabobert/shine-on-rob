/*
To do:
  point to production db
  utilize sequlize to:
    query
    insert data
  fix params so they are req.body.params
  convert fields to hidden text fields
  testing
*/


/*
  Improvements:
    Create a service object for each state, this way a state could respond to multiple inputs]
    Use a graph DB to store conversatioal pathways, better mapping of conversional flows    Utlize AIML - https://blog.recime.io/using-aiml-and-nlp-to-create-a-conversation-flow-for-your-chatbot-fea63d09b2e6
    
*/

const { User } = require('../sequelize')
const { Truthy } = require('../models/truthy')
const { Greeter } = require('../models/greeter')
var express = require('express');
var router = express.Router();
var pry = require('pryjs')
var axios = require('axios')


// User.findOne({
//   where: { name: 'john' },
//   // order: ['id', 'DESC'],
//   attributes: ['id', ['name', 'goal']]
// }).then(user => {
//   console.log(user);
//     // eval(pry.it)
// })



// eval(pry.it)



router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });


/* GET message. */
router.get('/', function(req, res, next) {
  res.send('you must "post" a request');
});


/*
  Because this app is so simple we are passing user & goal, rather than the user id.  This is also because
  for the majority of the app, the data is in memory and not saved yet
*/
router.post('/', function(req, res, next) {
  console.log(req.body)
  // eval(pry.it)
  // putting these into variables, because if this were to extended these values may have to be cleansed. for instance
  // the goal should be joy, not JoY or joy!!!!!!!!!
  let name = req.body.name;
  let goal = req.body.goal;


  //VERY basic state machine.  to improve quality of each conversation at each state, a service object could be created
  switch(req.body.aasm_state) {
    case "greetings":
      res.json({ message: (new Greeter).speak(), nextState: "nameLookup" })
      break;
    case "nameLookup":




      User.findOne({
        where: { name: name },
        order: [
          ['id', 'DESC']
        ],
      }).then(user => {
        if (user) {
          goal = user.goal
          res.json({
            message: `Hi ${name}! Welcome back! you said before you wanted to work on: ${goal}. What do you want to work on now?`,
            name: name,
            goal: goal,
            nextState: "goalLookup"
          });
         } else {
          name = req.body.input;
          res.json({
            message: `Hi, ${name} Whats one thing you want to work on?`,
            name: name,
            nextState: "goalLookup"
          });
        }        
      })
      break;
    case "goalLookup":
      goal = req.body.input;
      res.json({
        message: `So you want to work on ${goal}. Does that sound right, ${name}?`,
        name: name,
        goal: goal,
        nextState: "confirmGoal"
      });
      break;
    case "confirmGoal":
      //converts truthy and falsey values to true and false
      t = new Truthy(req.body.input)
      if (t.value) 
        // save to the db
        // fetch the goal from Shine API
        axios.post('https://shine-se-test-api.herokuapp.com/', {
          goal: "be more joyful"
        })
        .then((response) => {
          res.json({
            message: `Great! Heres a daily dose of Shine to get you started ${response.data.content}`,
            name: name,
            goal: goal,
            nextState: "complete"
          })
        })
        .catch((error) => {
          console.log(error);
        });
      else
        res.json({
          message: `No problem, ${name}! Let's try again. What's one thing you want to work on?`,
          name: name,
          nextState: "goalLookup"
        });
      break;
    default: 
      res.json({ message: "I got confused lets start over. Whats your name", nextState: "nameLookup"  })
  }
});



module.exports = router;
