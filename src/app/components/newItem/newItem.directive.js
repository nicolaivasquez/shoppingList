(function() {
    'use strict';

    angular
        .module('shopList')
        .directive('newItem', newItem);

    function newItem() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/newItem/newItem.directive.html',
            scope: {},
            controller: NewItemController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

        function NewItemController() {
            var vm = this;
            vm.item = {
                "name": "",
                "description": ""
            }
        }
    }
})();