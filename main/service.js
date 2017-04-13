


module.exports.Service = class {

    static shortLink(_link) {
        let pattern1 = new RegExp("http://", "gi");
        let pattern2 = new RegExp("https://", "gi");
        if (pattern1.test(_link)) {
            _link.replace(pattern1, "");
        } else {
            _link.replace(pattern2, "");
        }
        return _link;
    }
}
