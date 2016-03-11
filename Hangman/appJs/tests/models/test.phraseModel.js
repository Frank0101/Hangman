/// <reference path="../../../scripts/jquery-2.1.3.min.js" />
/// <reference path="../../../scripts/jasmine/jasmine.js" />
/// <reference path="../../hangman/models/characterModel.js" />
/// <reference path="../../hangman/models/wordModel.js" />
/// <reference path="../../hangman/models/phraseModel.js" />

describe("Phrase Model:", function () {
    it("It should be created from a phrase", function () {
        var ns = window.hangman;
        var model = new ns.PhraseModel("The Test Phrase");
        expect(model).not.toBeNull();
    });

    describe("When created from a valid phrase", function () {
        var model;

        beforeEach(function () {
            var ns = window.hangman;
            model = new ns.PhraseModel("The Test Phrase");
        });

        it("It should return the phrase", function () {
            expect(model.phrase).toBe("The Test Phrase");
        });

        it("It should return the phrase's words", function () {
            expect(model.words).not.toBeNull();
            expect(model.words.length).toBe(3);
            expect(model.words[0].word).toBe("The");
            expect(model.words[1].word).toBe("Test");
            expect(model.words[2].word).toBe("Phrase");
        });

        it("It should return the count of discovered characters", function () {
            expect(model.discoveredCount()).toBe(0);
        });

        it("it should return the count of undiscovered characters", function () {
            expect(model.undiscoveredCount()).toBe(13);
        });

        it("It should be possible to set a character as discovered passing a lowercase character", function () {
            model.discoverCharacter("t");
            expect(model.words[0].discoveredCount()).toBe(1);
            expect(model.words[1].discoveredCount()).toBe(2);
            expect(model.discoveredCount()).toBe(3);
            expect(model.undiscoveredCount()).toBe(10);
        });

        it("It should be possible to set a character as discovered passing an uppercase character", function () {
            model.discoverCharacter("T");
            expect(model.words[0].discoveredCount()).toBe(1);
            expect(model.words[1].discoveredCount()).toBe(2);
            expect(model.discoveredCount()).toBe(3);
            expect(model.undiscoveredCount()).toBe(10);
        });

        it("It should be possible to know if a character was found in the phrase", function () {
            expect(model.discoverCharacter("t")).toBe(true);
            expect(model.discoverCharacter("x")).toBe(false);
        });

        it("It should be possible to discover the phrase", function () {
            expect(model.phraseDiscovered()).toBe(false);
            model.discoverCharacter("t");
            model.discoverCharacter("h");
            model.discoverCharacter("e");
            model.discoverCharacter("s");
            model.discoverCharacter("p");
            model.discoverCharacter("r");
            model.discoverCharacter("a");
            expect(model.phraseDiscovered()).toBe(true);
        });
    });

    describe("When created from an invalid phrase", function () {
        var model;

        beforeEach(function () {
            var ns = window.hangman;
            model = new ns.PhraseModel("1The _Test Phrase! ");
        });

        it("It should skip the invalid characters", function () {
            expect(model.phrase).toBe("The Test Phrase");
        });
    });
});
