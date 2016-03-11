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
