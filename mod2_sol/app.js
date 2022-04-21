(function() {
    'use strict';

    angular.module('ShoppingListCheckOff',[])
    .controller('ToBuyController',ToBuyController)
    .controller('AlreadyBoughtController',AlreadyBoughtController)
    .service('ShoppingListCheckOffService',ShoppingListCheckOffService);

    ToBuyController.$inject=['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService){


        var tobuy=this;

        tobuy.items=ShoppingListCheckOffService.getToBuyItems();



        tobuy.buyItem=function(itemIndex) {
            ShoppingListCheckOffService.buyItem(itemIndex);
        };
    }

    AlreadyBoughtController.$inject=['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService){
        var bought=this;

        bought.items=ShoppingListCheckOffService.getBoughtItems();



    }

    function ShoppingListCheckOffService(){
        var service=this;
        var toBuy=[
            { itemName: "Fish", itemQuantity: "2 packs" },
            { itemName: "Chicken", itemQuantity: "5 packs" },
            { itemName: "Lamb", itemQuantity: "4 packs" },
            { itemName: "Coke", itemQuantity: "6 cans" },
            { itemName: "Ice-cream", itemQuantity: "2 pints" },
            { itemName: "Chips", itemQuantity: "10 packs" }
        ];

        var alreadyBought=[];

        service.buyItem=function(itemIndex){
            var item=toBuy[itemIndex];

            alreadyBought.push(item);
            toBuy.splice(itemIndex,1);
        };

        service.getToBuyItems=function() {
            return toBuy;
        }
        service.getBoughtItems=function(){
            return alreadyBought;

        }
    }


})();
