(function () {
    var ns = window.hangman = window.hangman || {};
    ns.PhraseModel = function (phrase) {
        var _this = this;

        _this.phrase = phrase.replace(/[^a-zA-Z ]/g, "").trim();
        _this.words = [];
        _this.discoveredCount = function () {
            var count = 0;
            for (var n = 0; n < _this.words.length; n++) {
                count += _this.words[n].discoveredCount();
            }
            return count;
        };
        _this.undiscoveredCount = function () {
            var count = 0;
            for (var n = 0; n < _this.words.length; n++) {
                count += _this.words[n].undiscoveredCount();
            }
            return count;
        };
        _this.discoverCharacter = function (character) {
            var found = false;
            for (var n = 0; n < _this.words.length; n++) {
                if (_this.words[n].discoverCharacter(character))
                    found = true;
            }
            return found;
        };
        _this.phraseDiscovered = function () {
            return _this.undiscoveredCount() == 0;
        };
        _this.revealPhrase = function () {
            for (var n = 0; n < _this.words.length; n++) {
                _this.words[n].revealWord();
            }
        };

        function init() {
            var prevIndex = 0, index, word;
            while ((index = _this.phrase.indexOf(" ", prevIndex + 1)) != -1) {
                word = _this.phrase.substring(prevIndex, index);
                _this.words.push(new ns.WordModel(word));
                prevIndex = index;
            }
            word = _this.phrase.substring(prevIndex, _this.phrase.length);
            _this.words.push(new ns.WordModel(word));
        }
        init();
    };
}());
