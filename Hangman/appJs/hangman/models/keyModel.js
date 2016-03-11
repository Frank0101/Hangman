(function () {
    var ns = window.hangman = window.hangman || {};
    ns.KeyModel = function (key) {
        var _this = this;

        _this.key = key.toLowerCase();
        _this.pressed = false;
    };
}());
