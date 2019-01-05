'use strict';

const assert = require('assert');
const content = require('../content');

describe('content#selectUrl(undefined)', () => {
  it('should return CONTENT[0]', () => {
    assert.equal(content.selectUrl(undefined), content.CONTENT[0]);
  })
})

describe('content#selectUrl(0)', () => {
  it('should return CONTENT[0]', () => {
    assert.equal(content.selectUrl(undefined), content.CONTENT[0]);
  })
})

describe('content#selectUrl("abc")', () => {
  it('should return CONTENT[18]', () => {
    assert.equal(content.selectUrl("abc"), content.CONTENT[18]);
  })
})

describe('content#selectUrl("be more joyful")', () => {
  it('should return CONTENT[6]', () => {
    assert.equal(content.selectUrl("be more joyful"), content.CONTENT[6]);
  })
})