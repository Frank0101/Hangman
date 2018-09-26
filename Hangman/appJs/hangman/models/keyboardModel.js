(function () {
    var ns = window.hangman = window.hangman || {};
    ns.KeyboardModel = function () {
        var _this = this;

        _this.keys = [];
        _this.pressKey = function (key) {
            for (var n = 0; n < _this.keys.length; n++) {
                if (_this.keys[n].key == key.toLowerCase())
                    _this.keys[n].pressed = true;
            }
        };

        function init() {
            for (var n = 0; n < 26; n++)
                _this.keys.push(
                    new ns.KeyModel(String.fromCharCode(n + 97)));
        }
        init();
    };
}());
