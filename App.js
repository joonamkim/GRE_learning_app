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
    $scope.word = "";
    $scope.keys = [];
    $scope.definitions = [];
    $scope.examples = [];


    $scope.tempDic = {};
    $scope.tempList = [];

    $scope.anotherDic = {};

    // $http.get('https://frozen-peak-77472.herokuapp.com/getString').
    //     then(function(response) {
    //
    //     $scope.tempBool = true;
    //
    // });

    console.log("clicked " +$scope.clicked);
    $scope.lookup = function(){

        callAPI();
        $scope.words = {};
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
        //"https://api.dictionaryapi.dev/api/v1/entries/en/"
        $http.get("https://arcane-chamber-41533.herokuapp.com/getEnglishDef/" + $scope.words.name).
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

            $scope.word = word;


            for (let key in $scope.words) {
                for (let key1 in $scope.words[key]) {
                    // console.log(key1, $scope.words[key][key1])
                    // $scope.keys.push(key1);
                    console.log("key1   - " + key1);

                    $scope.tempList.push($scope.words[key][key1]['definition']);
                    $scope.tempList.push($scope.words[key][key1]['example']);

                    $scope.anotherDic['definition'] = $scope.words[key][key1]['definition'];
                    $scope.anotherDic['example'] = $scope.words[key][key1]['example'];

                    // $scope.definitions.push($scope.words[key][key1]['definition']);
                    // $scope.examples.push($scope.words[key][key1]['example']);


                    $scope.tempDic[key1] = $scope.anotherDic;
                    $scope.anotherDic = {};
                    $scope.tempList = [];

                }
            }
            // console.log($scope.keys);
            // console.log($scope.definitions);
            // console.log($scope.examples);
            console.log($scope.tempDic);/**/




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