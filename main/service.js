const constants = require('../misc/constants.json');

module.exports = {
  shortLink: (link) => {
    let pattern = /https?:\/\//gi;
    return link.replace(pattern, '');
  },

  enoughArgs: (amount, min = 0, max = min) => {
    if (max === 'max') max = constants.interpretMaxAsValue;
    return max >= min ? (amount <= max && amount >= min) : false;
  }

  // isAuthor:
};
