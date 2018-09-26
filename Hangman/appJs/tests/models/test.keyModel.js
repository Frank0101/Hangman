/// <reference path="../../../scripts/jquery-2.1.3.min.js" />
/// <reference path="../../../scripts/jasmine/jasmine.js" />
/// <reference path="../../hangman/models/keyModel.js" />

describe("Key Model:", function () {
    it("It should be created from a key", function () {
        var ns = window.hangman;
        var model = new ns.KeyModel("a");
        expect(model).not.toBeNull();
    });

    describe("When created from a lowercase key", function () {
        var model;

        beforeEach(function () {
            var ns = window.hangman;
            model = new ns.KeyModel("a");
        });

        it("It should return the key", function () {
            expect(model.key).toBe("a");
        });
    });

    describe("When created from an uppercase key", function () {
        var model;

        beforeEach(function () {
            var ns = window.hangman;
            model = new ns.KeyModel("A");
        });

        it("It should return the lowercase key", function () {
            expect(model.key).toBe("a");
        });
    });
});
