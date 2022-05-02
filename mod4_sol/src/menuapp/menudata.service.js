(function () {
'use strict';

angular.module('data')
.service('MenuDataService', MenuDataService);


MenuDataService.$inject = ['$http', '$q'];
function MenuDataService($http, $q) {
  var service = this;

  //return a promise on all categories
  service.getAllCategories = function () {

    var deferred = $q.defer();

    $http({
      method: 'GET',
      url: 'https://davids-restaurant.herokuapp.com/categories.json'
    })
    .then( function (result) {
      //  console.log(result.data);
      deferred.resolve(result.data);
    });

    return deferred.promise;
  };

  //return a promise on all items in a categories
  service.getItemsForCategory = function (shortName) {
    var deferred = $q.defer();

    //the https returned
    $http({
      method: 'GET',
      url: 'https://davids-restaurant.herokuapp.com/menu_items.json',
      params: {
        category: shortName
      }
    })
    .then( function (result) {
      deferred.resolve(result.data.menu_items);
    })

    .catch(function (error) {
      console.log(error);
      });

    return deferred.promise;
  };

}

})();
