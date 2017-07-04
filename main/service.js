module.exports = {
  shortLink: (link) => {
    let pattern = /https?:\/\//gi;
    return link.replace(pattern, '');
  }
};
