'use strict';

module.exports.CONTENT = [
  'http://daily.shinetext.com/2017-03-01',
  'http://daily.shinetext.com/2017-03-02',
  'http://daily.shinetext.com/2017-03-03',
  'http://daily.shinetext.com/2017-03-06',
  'http://daily.shinetext.com/2017-03-07',
  'http://daily.shinetext.com/2017-03-08',
  'http://daily.shinetext.com/2017-03-09',
  'http://daily.shinetext.com/2017-03-10',
  'http://daily.shinetext.com/2017-03-13',
  'http://daily.shinetext.com/2017-03-14',
  'http://daily.shinetext.com/2017-03-15',
  'http://daily.shinetext.com/2017-03-16',
  'http://daily.shinetext.com/2017-03-17',
  'http://daily.shinetext.com/2017-03-20',
  'http://daily.shinetext.com/2017-03-21',
  'http://daily.shinetext.com/2017-03-22',
  'http://daily.shinetext.com/2017-03-23',
  'http://daily.shinetext.com/2017-03-24',
  'http://daily.shinetext.com/2017-03-27',
  'http://daily.shinetext.com/2017-03-28',
  'http://daily.shinetext.com/2017-03-29',
  'http://daily.shinetext.com/2017-03-30',
  'http://daily.shinetext.com/2017-03-31',
];

/**
 * Just some pseudorandom way of picking content.
 *
 * @param val {string}
 * @return {string}
 */
module.exports.selectUrl = (val) => {
  let index = 0;
  for (let i = 0; typeof val === 'string' && i < val.length; i++) {
    index += val.charCodeAt(i);
    index %= this.CONTENT.length;
  }

  return this.CONTENT[index];
};