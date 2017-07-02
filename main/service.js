module.exports.Service = class {
  static shortLink (_link) {
    let pattern = /https?:\/\//gi;
    return _link.replace(pattern, '');
  }
};
