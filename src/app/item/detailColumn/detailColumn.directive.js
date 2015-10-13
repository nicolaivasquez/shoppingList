(function() {
    'use strict';

    angular
        .module('shopList')
        .directive('detailColumn', detailColumn);

    function detailColumn() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/item/detailColumn/detailColumn.directive.html',
            scope: {
                list: "=",
                item: "="
            },
            controller: DetailColumnController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

        function DetailColumnController() {
            var vm = this;
        }
    }
})();