/*
To do:
  uncomment messages.test
  testing for frontend
*/


/*
  Improvements:
    Create a service object for each state, this way a state could respond to multiple inputs]
    Use a graph DB to store conversatioal pathways, better mapping of conversional flows
    Utlize AIML as a way to provide support for nlp tools - https://blog.recime.io/using-aiml-and-nlp-to-create-a-conversation-flow-for-your-chatbot-fea63d09b2e6
    move db config out of the model into a yml file not in the repo or the env variables
    my react throws a warning
    use local db for testing. created name with random uuid for testing in the app
    Refactor code to use a sync, and chain promised.  In places i nested thens rather than chaining.  this should be refactored to use await or chaining
    (Assuming a more complex user account system is not being created, where users and goals are not being normalized a la classic dB design)
    Add created at updated at and counts to users table. No need to duplicate data, can get most recent goal via updated at and can store how many times a goal has been requested via counts
*/

const { User } = require('../sequelize')
// Created a class to convert string values to true and false.  I didn't want to pollute the route with if/switch statements that could easily be expanded upon
const { Truthy } = require('../models/truthy')
// Created a class for greeter.  I didn't want to pollute the route with the greeting logic, that could easily be expanded upon
const { Greeter } = require('../models/greeter')
var express = require('express');
var router = express.Router();
// pry is a ruby REPL debug gem, that i was happy to see have a port in node
var pry = require('pryjs')
// Using axios instead of fetch because axios returns promises
var axios = require('axios')

// Trying to bypass potential CORS error
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
  // listing all incoming body variables
  // console.log(req.body)
  
  // putting these into variables, because if this were to extended these values may have to be cleansed. for instance
  // the goal should be joy, not JoY or joy!!!!!!!!!
  // allows us to test the app via react or a pure rest client
  let name = req.body.name || (req.body.params && req.body.params.name)
  let goal = req.body.goal || (req.body.params && req.body.params.goal)
  let input = req.body.input || (req.body.params && req.body.params.input)
  let aasm_state = req.body.aasm_state || (req.body.params && req.body.params.aasm_state)

  //VERY basic state machine.  to improve quality of each conversation at each state, a service object could be created
  switch(aasm_state) {
    case "greetings":
      res.json({ message: (new Greeter).speak(), nextState: "nameLookup" })
      break;
    case "nameLookup":
      name = input
      User.findOne({
        where: { name },
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
          name = input;
          res.json({
            message: `Hi, ${name} Whats one thing you want to work on?`,
            name: name,
            nextState: "goalLookup"
          });
        }        
      })
      break;
    case "goalLookup":
      goal = input;
      res.json({
        message: `So you want to work on ${goal}. Does that sound right, ${name}?`,
        name: name,
        goal: goal,
        nextState: "confirmGoal"
      });
      break;
    case "confirmGoal":
      //converts truthy and falsey values to true and false
      if (new Truthy(input).value()) 
        User.create({ name, goal}).then(user => {
          // fetch the goal from Shine API
          axios.post('https://shine-se-test-api.herokuapp.com/', {
            goal: goal
          })
          .then((response) => {
            res.json({
              message: `Great! Heres a daily dose of Shine to get you started ${response.data.content}`,
              name: name,
              goal: goal,
              nextState: "complete",
              userId: user.id
            })
          })
          .catch((error) => {
            console.log(error);
          });
        })
      else
        res.json({
          message: `No problem, ${name}! Let's try again. What's one thing you want to work on?`,
          name: name,
          nextState: "goalLookup"
        });
      break;
    default: 
      res.json({ message: "I got confused lets start over. Whats your name?", nextState: "nameLookup"  })
  }
});



module.exports = router;
