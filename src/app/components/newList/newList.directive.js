(function() {
    'use strict';

    angular
        .module('shopList')
        .directive('newList', newList);

    function newList() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/newList/newList.directive.html',
            scope: {},
            controller: NewListController,
            controllerAs: 'vm',
            bindToController: true
        };

        function NewListController() {
            var vm = this;
        }

        return directive;
    }
})();