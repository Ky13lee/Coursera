(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ["$scope"];
function LunchCheckController($scope) {
  $scope.sayMessage = "";

// to only call the split() method on strings. otherrwise will get error
// Cannot read Property 'split' of Undefined #
  $scope.check = function () {
    var dish1 = String($scope.dish)
    var dishArray = dish1.split(",");
    var len = dishArray.length;

    if ($scope.dish == null || $scope.dish == "") {
      $scope.sayMessage = "Please enter data first";
    } else if (len <= 3) {
      $scope.sayMessage = "Enjoy!";
    } else {
      $scope.sayMessage = "Too much!";
    }

  }

  
}

})();
