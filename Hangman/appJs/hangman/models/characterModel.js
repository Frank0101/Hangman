(function () {
    var ns = window.hangman = window.hangman || {};
    ns.CharacterModel = function (character) {
        var _this = this;

        _this.character = character.toLowerCase();
        _this.discovered = false;
    };
}());
