module.exports.Service = class {
  static shortLink (link) {
    let pattern = /https?:\/\//gi;
    return link.replace(pattern, '');
  }
};
