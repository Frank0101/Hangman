(function () {
    var ns = window.hangman = window.hangman || {};
    ns.WordModel = function (word) {
        var _this = this;

        _this.word = word.replace(/[^a-zA-Z]/g, "");
        _this.characters = [];
        _this.discoveredCount = function () {
            var count = 0;
            for (var n = 0; n < _this.characters.length; n++) {
                if (_this.characters[n].discovered) count++;
            }
            return count;
        };
        _this.undiscoveredCount = function () {
            return _this.characters.length - _this.discoveredCount();
        };
        _this.discoverCharacter = function (character) {
            var found = false;
            for (var n = 0; n < _this.characters.length; n++) {
                if (_this.characters[n].character == character.toLowerCase()) {
                    _this.characters[n].discovered = true;
                    found = true;
                }
            }
            return found;
        };
        _this.wordDiscovered = function () {
            return _this.undiscoveredCount() == 0;
        };
        _this.revealWord = function () {
            for (var n = 0; n < _this.word.length; n++) {
                _this.characters[n].discovered = true;
            }
        };

        function init() {
            for (var n = 0; n < _this.word.length; n++) {
                _this.characters.push(
                    new ns.CharacterModel(_this.word[n]));
            }
        }
        init();
    };
}());
