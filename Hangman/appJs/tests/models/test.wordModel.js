/// <reference path="../../../scripts/jquery-2.1.3.min.js" />
/// <reference path="../../../scripts/jasmine/jasmine.js" />
/// <reference path="../../hangman/models/characterModel.js" />
/// <reference path="../../hangman/models/wordModel.js" />

describe("Word Model:", function () {
    it("It should be created from a word", function () {
        var ns = window.hangman;
        var model = new ns.WordModel("MyTestWord");
        expect(model).not.toBeNull();
    });

    describe("When created from a valid word", function () {
        var model;

        beforeEach(function () {
            var ns = window.hangman;
            model = new ns.WordModel("MyTestWord");
        });

        it("It should return the word", function () {
            expect(model.word).toBe("MyTestWord");
        });

        it("It should return the word's characters", function () {
            expect(model.characters).not.toBeNull();
            expect(model.characters.length).toBe(10);
            expect(model.characters[0].character).toBe("m");
            expect(model.characters[1].character).toBe("y");
            expect(model.characters[2].character).toBe("t");
            expect(model.characters[3].character).toBe("e");
            expect(model.characters[4].character).toBe("s");
            expect(model.characters[5].character).toBe("t");
            expect(model.characters[6].character).toBe("w");
            expect(model.characters[7].character).toBe("o");
            expect(model.characters[8].character).toBe("r");
            expect(model.characters[9].character).toBe("d");
        });

        it("It should return the count of discovered characters", function () {
            expect(model.discoveredCount()).toBe(0);
        });

        it("it should return the count of undiscovered characters", function () {
            expect(model.undiscoveredCount()).toBe(10);
        });

        it("It should be possible to set a character as discovered passing a lowercase character", function () {
            model.discoverCharacter("t");
            expect(model.characters[2].discovered).toBe(true);
            expect(model.characters[5].discovered).toBe(true);
            expect(model.discoveredCount()).toBe(2);
            expect(model.undiscoveredCount()).toBe(8);
        });

        it("It should be possible to set a character as discovered passing an uppercase character", function () {
            model.discoverCharacter("T");
            expect(model.characters[2].discovered).toBe(true);
            expect(model.characters[5].discovered).toBe(true);
            expect(model.discoveredCount()).toBe(2);
            expect(model.undiscoveredCount()).toBe(8);
        });

        it("It should be possible to know if a character was found in the word", function () {
            expect(model.discoverCharacter("t")).toBe(true);
            expect(model.discoverCharacter("x")).toBe(false);
        });

        it("It should be possible to discover the word", function () {
            expect(model.wordDiscovered()).toBe(false);
            model.discoverCharacter("m");
            model.discoverCharacter("y");
            model.discoverCharacter("t");
            model.discoverCharacter("e");
            model.discoverCharacter("s");
            model.discoverCharacter("w");
            model.discoverCharacter("o");
            model.discoverCharacter("r");
            model.discoverCharacter("d");
            expect(model.wordDiscovered()).toBe(true);
        });
    });

    describe("When created from an invalid word", function () {
        var model;

        beforeEach(function () {
            var ns = window.hangman;
            model = new ns.WordModel("1My_Test Word!");
        });

        it("It should skip the invalid characters", function () {
            expect(model.word).toBe("MyTestWord");
        });
    });
});
