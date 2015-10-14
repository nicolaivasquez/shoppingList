(function(){
    'use strict';

    angular
        .module('shopList')
        .directive('itemColumn', itemColumn);

    function itemColumn(ActiveList) {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/item/itemColumn/itemColumn.directive.html',
            scope: {
                list: "=",
                items: "="
            },
            controller: ItemColumnController,
            controllerAs: 'vm',
            bindToController: true,
            link: function(scope, elem, attrs) {
                var test = angular.element(elem[0].querySelector('.new-item'));
                test.bind('click', function() {
                    console.log(scope.vm);
                    scope.vm.list.name = 'Changed';
                    ActiveList.setList(scope.vm.list);
                    console.log(ActiveList.getList());
                });
            }
        };

        return directive;

        function ItemColumnController() {
            var vm = this;
        }
    }
})();