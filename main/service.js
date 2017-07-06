const interpretInfAsValue = 5;

module.exports = {
  shortLink: (link) => {
    let pattern = /https?:\/\//gi;
    return link.replace(pattern, '');
  },

  enoughArgs: (amount, min = 0, max = min) => {
    if (max === 'inf') max = interpretInfAsValue;
    return amount <= max && amount >= min;
  }

  // isAuthor:
};
