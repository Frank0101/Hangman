angular.module("hangmanApp.controllers").controller("hangmanController",
    ["$scope", "hangmanService", "wordService", "hangmanConstants",
        function ($scope, hangmanService, wordService, hangmanConstants) {
            $scope.errors = 0;
            $scope.keyboard = null;
            $scope.phrase = null;

            $scope.init = function () {
                $scope.errors = 0;
                $scope.keyboard = hangmanService.getKeyboard();
                wordService.getWord().then(function (word) {
                    $scope.phrase = hangmanService.getPhrase(word);
                });
            };
            $scope.onKeyPress = function (key) {
                $scope.keyboard.pressKey(key);
                if (!$scope.phrase.discoverCharacter(key)) {
                    $scope.errors++;
                    if ($scope.playerLose())
                        $scope.phrase.revealPhrase();
                }
            };
            $scope.playerWins = function () {
                if ($scope.phrase)
                    return $scope.errors < hangmanConstants.MAX_ERRORS
                        && $scope.phrase.phraseDiscovered();
                else
                    return false;
            };
            $scope.playerLose = function () {
                return $scope.errors == hangmanConstants.MAX_ERRORS;
            };
            $scope.endGame = function () {
                return $scope.playerWins() || $scope.playerLose();
            };
            $scope.init();
        }]);
