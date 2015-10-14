(function() {
    'use strict';

    angular
        .module('shopList')
        .directive('detailColumn', detailColumn);

    function detailColumn(ActiveList) {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/item/detailColumn/detailColumn.directive.html',
            scope: {
                //list: "=",
                item: "="
            },
            controller: DetailColumnController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

        function DetailColumnController() {
            var vm = this;
            vm.list = ActiveList.getList();
        }
    }
})();