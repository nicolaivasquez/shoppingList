(function() {
    'use strict';

    angular
        .module('shopList')
        .directive('topNavbar', topNavbar);

    /** @ngInject */
    function topNavbar() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/topNavbar/topNavbar.html',
            scope: {
              authenticated: '='
            },
            controller: TopNavbarController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

        /** @ngInject */
        function TopNavbarController() {
            var vm = this;
        }
    }

})();
