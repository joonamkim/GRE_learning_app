angular.module('GRE', ['ngSanitize', 'ngclipboard'])
.controller('AppController', function($scope, $http, $sanitize) {

    $scope.wordLoaded = false;
    $scope.body = "";
    $scope.wordDict = {};
    $scope.defExDict = {};
    $scope.value = "fuck";
    $scope.tempBool = false;
    $scope.clicked = false;
    $scope.words = {};
    $scope.wordsLoading = true;

    // $http.get('https://frozen-peak-77472.herokuapp.com/getString').
    //     then(function(response) {
    //
    //     $scope.tempBool = true;
    //
    // });

    console.log("clicked " +$scope.clicked);

    $scope.lookup = function(){

        callAPI();

        // console.log($scope.words);
        // 여기서 단어 정리 되는 것들을 무르는 function 필요

        // if(checkForComma($scope.words.name)) { // more than one words (need to check for empty words after comma
        //     console.log($scope.words.name + " has comma")
        // } else {
        //
        //
        // }
        console.log($scope.wordLoaded );
    };
    function callAPI() {
        $http.get("https://api.dictionaryapi.dev/api/v1/entries/en/" + $scope.words.name).
        then(function(response){

            let word = response.data[0]['word'];
            $scope.wordLoaded = true;

            // create a new dictionary

            // put all the definition + examples in the dictionary
            // append it to the main dictionary
            // save it into an object that will be passed to HTML

            //put key=word in the words dictionary
            for (let [key, value] of Object.entries(response.data[0]['meaning'])) {

                $scope.defExDict[key] = value[0];

                // console.log(key, value);
                // console.log("definition: ", value[0]['definition']);
                // console.log("example: ", value[0]['example']);
            }
            $scope.words[word] = $scope.defExDict;
            console.log($scope.defExDict);
            console.log($scope.wordLoaded );
            $scope.wordsLoading = false;
        });
    }
    // $scope.$watch('wordLoaded==true', function (newValue, oldValue) {
    //
    //     $scope.wordLoaded = true;
    //
    //
    // }, true);

    function checkForComma(word) {
        return word.includes(",")
    }

});