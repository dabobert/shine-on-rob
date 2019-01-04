'use strict'

var pry = require('pryjs')

class Truthy {

  constructor(input){
    this.input = input
  }

  get likeTrue() {
    return ["yes", "y", "yeah", "oui", "yup"]
  }

  get likeFalse() {
    return ["no", "n", "uh uh", "non", "nope"]
  }

  value() {
    if (this.likeTrue.includes(this.input))
      return true
    else if (this.likeFalse.includes(this.input))
      return false
    else
      return undefined
  }
}

module.exports = { Truthy }