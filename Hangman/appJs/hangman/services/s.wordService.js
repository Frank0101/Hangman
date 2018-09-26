angular.module("hangmanApp.services").service("wordService",
    ["$http", "$q", function ($http, $q) {
        var _this = this;
        var words = null;

        _this.getWord = function () {
            var d = $q.defer();
            if (!words) {
                $http.get("/feeds/words_it.json").success(function (data) {
                    words = data;
                    d.resolve(words[Math.floor(Math.random() * words.length)]);
                });
            } else {
                d.resolve(words[Math.floor(Math.random() * words.length)]);
            }
            return d.promise;
        };
    }]);
