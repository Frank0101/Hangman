/// <reference path="../../../scripts/jquery-2.1.3.min.js" />
/// <reference path="../../../scripts/jasmine/jasmine.js" />
/// <reference path="../../../scripts/angular.min.js" />
/// <reference path="../../../scripts/angular-mocks.js" />
/// <reference path="../../hangman/hangmanBundle.js" />

describe("Hangman Service - integration:", function () {
    describe("When the service is created", function () {
        var target;

        beforeEach(function () {

            //Load the module to test
            //and its dependency modules
            module("hangmanApp.constants");
            module("hangmanApp.services");
            inject(function ($injector) {

                //Resolve the hangmanService
                target = $injector.get("hangmanService");
            });
        });

        it("It should return a keyboard", function () {
            var keyboard = target.getKeyboard();
            expect(keyboard).not.toBeNull();
        });

        it("It should return a phrase", function () {
            var phrase = target.getPhrase("The Test Phrase");
            expect(phrase).not.toBeNull();
        });
    });
});

describe("Hangman Service - unit:", function () {
    describe("When the service is created", function () {
        var target;

        //Mock objects
        var mockHangmanConstants = {
            NS: window.hangman,
            MAX_ERRORS: 5
        };

        beforeEach(function () {

            //Create a mock module with our
            //mock objects. The dependencies
            //will be all taken from here
            module(function ($provide) {
                $provide.value("hangmanConstants", mockHangmanConstants);
            });

            //Load the module to test
            module("hangmanApp.services");
            inject(function ($injector) {

                //Resolve the hangmanService
                target = $injector.get("hangmanService");
            });
        });

        it("It should return a keyboard", function () {
            var keyboard = target.getKeyboard();
            expect(keyboard).not.toBeNull();
        });

        it("It should return a phrase", function () {
            var phrase = target.getPhrase("The Test Phrase");
            expect(phrase).not.toBeNull();
        });
    });
});
