(function() {
    'use strict';

    angular
        .module('shopList')
        .directive('newList', newList);

    function newList() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/newList/newList.directive.html',
            scope: {
                "list": "=",
                "save": "&"
            },
            controller: NewListController,
            controllerAs: 'vm',
            bindToController: true,
            link: NewListLink
        };

        return directive;

        function NewListController() {
            var vm = this;

            vm.saveList = function() {
                vm.save();
            }
        }

        function NewListLink(scope, elem, attrs) {
            // focus on list name field
            var listNameFld = elem[0].querySelector('form input#list-name');
            listNameFld.focus();
        }
    }
})();