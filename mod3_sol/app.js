(function () {

  'use strict'

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var narrow = this;

  // invoke function with ng-click in index.html
  narrow.searchMenuItems = function () {

  // narrow.searchTerm is the input text from ng-model in index.html
    if (narrow.searchTerm === "" || narrow.searchTerm===undefined) {
      narrow.found = [];

    } else {
      MenuSearchService.getMatchedMenuItems(narrow.searchTerm)
      .then(function(result) {
        narrow.found = result;

      });
    }
  } // end narrow.searchTerm

  narrow.removeItem = function(itemIndex) {
    MenuSearchService.removeItem(itemIndex);
  };
} // end narrow.removeItem


function FoundItemsDirective() {
  var ddo = {

    templateUrl: 'foundItems.html',

    scope: {
      items: '<',
      onRemove: '&'
    },

    controller: FoundItemsDirectiveController,
    controllerAs: 'foundCtrl',
    bindToController: true
  };

  return ddo;
}


function FoundItemsDirectiveController() {
  var foundCtrl = this;

  foundCtrl.isBeforeSearch = function() {
    return foundCtrl.items == undefined;
  }

  foundCtrl.isNothingFound = function() {
    return foundCtrl.items != undefined && foundCtrl.items.length === 0;
  }
}


MenuSearchService.$inject = ['$http', 'ApiBasePath'];

function MenuSearchService($http, ApiBasePath) {
  var service = this;
  var foundItems = [];

  service.getMatchedMenuItems = function(searchTerm) {

    return $http({

      method: "GET",
      url: (ApiBasePath + "/menu_items.json")

    }).then(function(result) {
      var allItems = result.data.menu_items;

      foundItems = [];

      for (var index = 0; index < allItems.length; ++index) {

        // only search the "decription" property. if search item appears in other part, it will not be matched
        if (allItems[index].description.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0) {
          foundItems.push(allItems[index]);
        }
      }

      return foundItems;

    });
  };


  service.removeItem = function(itemIndex) {
    foundItems.splice(itemIndex, 1);
  };


}


})();
