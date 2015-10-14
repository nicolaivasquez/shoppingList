(function(){
    'use strict';

    angular
        .module('shopList')
        .directive('itemColumn', itemColumn);

    function itemColumn(ActiveList, ListService) {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/itemColumn/itemColumn.directive.html',
            scope: {
                list: "=",
                items: "="
            },
            controller: ItemColumnController,
            controllerAs: 'vm',
            bindToController: true,
        };

        return directive;

        function ItemColumnController() {
            var vm = this;
        }
    }
})();