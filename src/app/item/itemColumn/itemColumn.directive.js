(function(){
    'use strict';

    angular
        .module('shopList')
        .directive('itemColumn', itemColumn);

    function itemColumn() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/item/itemColumn/itemColumn.directive.html',
            scope: {
                list: "=",
                items: "="
            },
            controller: ItemColumnController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

        function ItemColumnController() {
            var vm = this;
            console.log(vm);
        }
    }
})();