'use strict'

var pry = require('pryjs')

class Greeter {

  speak() {
    let hour = (new Date()).getHours();
    let timeOfDay;
    if (hour <= 12)
      timeOfDay = "morning"
    else if (hour >= 18)
      timeOfDay = "evening"
    else
      timeOfDay = "afternoon"

    return `Good ${timeOfDay}. What is your name?`
  }
}

module.exports = { Greeter }