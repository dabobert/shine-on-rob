var supertest = require('supertest');  
var chai = require('chai');  
var uuid = require('uuid');  
var app = require('../app.js');
var pry = require('pryjs')

global.app = app;  
global.expect = chai.expect;  
global.request = supertest(app);  