(function() {
    'use strict';

    angular
        .module('shopList')
        .directive('listColumn', listColumn);

    function listColumn() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/listColumn/listColumn.directive.html',
            scope: {
                lists: "="
            },
            controller: ListColumnController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

        function ListColumnController() {
            var vm = this;
        }
    }
})();