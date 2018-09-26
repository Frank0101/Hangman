/// <reference path="../../../scripts/jquery-2.1.3.min.js" />
/// <reference path="../../../scripts/jasmine/jasmine.js" />
/// <reference path="../../hangman/models/characterModel.js" />

describe("Character Model:", function () {
    it("It should be created from a character", function () {
        var ns = window.hangman;
        var model = new ns.CharacterModel("a");
        expect(model).not.toBeNull();
    });

    describe("When created from a lowercase character", function () {
        var model;

        beforeEach(function () {
            var ns = window.hangman;
            model = new ns.CharacterModel("a");
        });

        it("It should return the character", function () {
            expect(model.character).toBe("a");
        });
    });

    describe("When created from an uppercase character", function () {
        var model;

        beforeEach(function () {
            var ns = window.hangman;
            model = new ns.CharacterModel("A");
        });

        it("It should return the lowercase character", function () {
            expect(model.character).toBe("a");
        });
    });
});
