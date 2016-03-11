///#source 1 1 /appJs/hangman/models/characterModel.js
(function () {
    var ns = window.hangman = window.hangman || {};
    ns.CharacterModel = function (character) {
        var _this = this;

        _this.character = character.toLowerCase();
        _this.discovered = false;
    };
}());

///#source 1 1 /appJs/hangman/models/keyboardModel.js
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

///#source 1 1 /appJs/hangman/models/keyModel.js
(function () {
    var ns = window.hangman = window.hangman || {};
    ns.KeyModel = function (key) {
        var _this = this;

        _this.key = key.toLowerCase();
        _this.pressed = false;
    };
}());

///#source 1 1 /appJs/hangman/models/phraseModel.js
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
            for (var n = 0; n < _this.words.length; n++) {
                if (!_this.words[n].wordDiscovered()) return false;
            }
            return true;
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

///#source 1 1 /appJs/hangman/models/wordModel.js
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

        function init() {
            for (var n = 0; n < _this.word.length; n++) {
                _this.characters.push(
                    new ns.CharacterModel(_this.word[n]));
            }
        }
        init();
    };
}());

///#source 1 1 /appJs/hangman/hangmanApp.js
angular.module("hangmanApp", [
    "hangmanApp.controllers",
    "hangmanApp.services",
    "hangmanApp.constants"]);
angular.module("hangmanApp.controllers", []);
angular.module("hangmanApp.services", []);
angular.module("hangmanApp.constants", []);

///#source 1 1 /appJs/hangman/controllers/c.hangmanController.js
angular.module("hangmanApp.controllers").controller("hangmanController",
    ["$scope", "hangmanService", "hangmanConstants",
        function ($scope, hangmanService, hangmanConstants) {
            $scope.errors = 0;
            $scope.keyboard = null;
            $scope.phrase = null;

            $scope.init = function () {
                $scope.errors = 0;
                $scope.keyboard = hangmanService.getKeyboard();
                $scope.phrase = hangmanService.getPhrase("My Test Phrase");
            };
            $scope.onKeyPress = function (key) {
                $scope.keyboard.pressKey(key);
                if (!$scope.phrase.discoverCharacter(key)) {
                    $scope.errors++;
                }
            };
            $scope.playerWins = function () {
                return $scope.phrase.phraseDiscovered();
            };
            $scope.playerLose = function () {
                return $scope.errors == hangmanConstants.MAX_ERRORS;
            };
            $scope.endGame = function () {
                return $scope.playerWins() || $scope.playerLose();
            };
            $scope.init();
        }]);

///#source 1 1 /appJs/hangman/services/s.hangmanService.js
angular.module("hangmanApp.services").service("hangmanService",
    ["hangmanConstants", function (hangmanConstants) {
        var _this = this;

        _this.getKeyboard = function () {
            return new hangmanConstants.NS.KeyboardModel();
        };
        _this.getPhrase = function (phrase) {
            return new hangmanConstants.NS.PhraseModel(phrase);
        };
    }]);

///#source 1 1 /appJs/hangman/constants/const.hangman.js
angular.module("hangmanApp.constants").constant("hangmanConstants", {
    NS: window.hangman,
    MAX_ERRORS: 5
});

