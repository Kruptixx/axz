const interpretInfAsValue = 50;

module.exports = {
  shortLink: (link) => {
    let pattern = /https?:\/\//gi;
    return link.replace(pattern, '');
  },

  enoughArgs: (amount, expected = 0) => {
    return amount === expected;
  },

  //without inrange
  enoughArgsInRange: (amount, min = 0, max = min) => {
    if(max === 'inf') max = interpretInfAsValue;
    return amount <= max && amount >= min;
  }

  //isAuthor:
};
