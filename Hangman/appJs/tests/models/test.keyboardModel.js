/// <reference path="../../../scripts/jquery-2.1.3.min.js" />
/// <reference path="../../../scripts/jasmine/jasmine.js" />
/// <reference path="../../hangman/models/keyModel.js" />
/// <reference path="../../hangman/models/keyboardModel.js" />

describe("Keyboard Model:", function () {
    it("It should be created", function () {
        var ns = window.hangman;
        var model = new ns.KeyboardModel();
        expect(model).not.toBeNull();
    });

    describe("When created", function () {
        var model;

        beforeEach(function () {
            var ns = window.hangman;
            model = new ns.KeyboardModel();
        });

        it("It should return the keys", function () {
            expect(model.keys).not.toBeNull();
            expect(model.keys.length).toBe(26);
            expect(model.keys[0].key).toBe("a");
            expect(model.keys[25].key).toBe("z");
        });

        it("It should be possible to press a key passing a lowercase key", function () {
            model.pressKey("a");
            expect(model.keys[0].pressed).toBe(true);
        });

        it("It should be possible to press a key passing an uppercase key", function () {
            model.pressKey("A");
            expect(model.keys[0].pressed).toBe(true);
        });
    });
});
