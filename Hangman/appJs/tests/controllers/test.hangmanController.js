/// <reference path="../../../scripts/jquery-2.1.3.min.js" />
/// <reference path="../../../scripts/jasmine/jasmine.js" />
/// <reference path="../../../scripts/angular.min.js" />
/// <reference path="../../../scripts/angular-mocks.js" />
/// <reference path="../../hangman/hangmanBundle.js" />

describe("Hangman Controller:", function () {
    describe("When the controller is created", function () {
        var $scope, target;

        //Mock objects
        var mockHangmanService = {
            getKeyboard: function () {
                return new window.hangman.KeyboardModel();
            },
            getPhrase: function (phrase) {
                return new window.hangman.PhraseModel(phrase);
            }
        };
        var mockWordService = {
            getWord: function () {
                return {
                    then: function (callback) {
                        callback("The Test Phrase");
                    }
                };
            }
        };
        var mockHangmanConstants = {
            NS: window.hangman,
            MAX_ERRORS: 5
        };

        beforeEach(function () {
            module("hangmanApp.controllers");
            inject(function ($controller, $rootScope) {

                //Create the test $scope
                $scope = $rootScope.$new();

                //With spyOn() we can check if our mock methods were called.
                //.ans.callThrough() tells to really execute the mock methods
                //(since we could override their returned value from here).
                spyOn(mockHangmanService, "getKeyboard").and.callThrough(); //<- Jasmine 2.0 only! (With 1.0 it was .andCallThrough())
                spyOn(mockHangmanService, "getPhrase").and.callThrough();   //<- Jasmine 2.0 only! (With 1.0 it was .andCallThrough())
                spyOn(mockWordService, "getWord").and.callThrough();        //<- Jasmine 2.0 only! (With 1.0 it was .andCallThrough())

                //Resolve the hangmanController.
                //In this case we can use the $controller object to
                //create the controller directly passing its dependencies.
                //So we don't need to create a mock module and to use the
                //$injector object as we did for the hangmanService
                target = $controller("hangmanController", {
                    "$scope": $scope,
                    "hangmanService": mockHangmanService,
                    "wordService": mockWordService,
                    "hangmanConstants": mockHangmanConstants
                });
            });
        });

        it("It should have a keyboard", function () {
            expect($scope.keyboard).not.toBeNull();

            //We can check this thanks to the spyOn()
            expect(mockHangmanService.getKeyboard).toHaveBeenCalled();
        });

        it("It should have a phrase", function () {
            expect($scope.phrase).not.toBeNull();

            //We can check this thanks to the spyOn()
            expect(mockHangmanService.getPhrase).toHaveBeenCalled();
            expect(mockWordService.getWord).toHaveBeenCalled();
        });

        it("It should be possible to win", function () {
            expect($scope.playerWins()).toBe(false);
            expect($scope.endGame()).toBe(false);
            $scope.onKeyPress("t");
            $scope.onKeyPress("h");
            $scope.onKeyPress("e");
            $scope.onKeyPress("s");
            $scope.onKeyPress("p");
            $scope.onKeyPress("r");
            $scope.onKeyPress("a");
            expect($scope.playerWins()).toBe(true);
            expect($scope.endGame()).toBe(true);
        });

        it("It should be possible to lose", function () {
            expect($scope.playerLose()).toBe(false);
            expect($scope.endGame()).toBe(false);
            $scope.onKeyPress("x");
            $scope.onKeyPress("x");
            $scope.onKeyPress("x");
            $scope.onKeyPress("x");
            $scope.onKeyPress("x");
            expect($scope.playerLose()).toBe(true);
            expect($scope.endGame()).toBe(true);
        });
    });
});
