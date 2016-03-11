/// <reference path="../../../scripts/jquery-2.1.3.min.js" />
/// <reference path="../../../scripts/jasmine/jasmine.js" />
/// <reference path="../../../scripts/angular.min.js" />
/// <reference path="../../../scripts/angular-mocks.js" />
/// <reference path="../../hangman/hangmanBundle.js" />

describe("Word Service:", function () {
    describe("When the service is created", function () {
        var target;

        //Mock objects
        var mockHttp = {
            get: function () {
                return {
                    success: function (callback) {
                        callback(["word1", "word2", "word3"]);
                    }
                };
            }
        };
        var mockQ = {
            defer: function () {
                return {
                    resolve: function () { },
                    promise: {
                        then: function (callback) {
                            callback("word");
                        }
                    }
                };
            }
        };

        beforeEach(function () {

            //Create a mock module with our
            //mock objects. The dependencies
            //will be all taken from here
            module(function ($provide) {
                $provide.value("$http", mockHttp);
                $provide.value("$q", mockQ);
            });

            //Load the module to test
            module("hangmanApp.services");
            inject(function ($injector) {

                //Resolve the hangmanService
                target = $injector.get("wordService");
            });
        });

        it("It should get a word", function () {
            var word = null;
            target.getWord().then(function (data) {
                word = data;
            });
            expect(word).toBe("word");
        });
    });
});
