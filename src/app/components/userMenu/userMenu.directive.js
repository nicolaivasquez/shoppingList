(function(){
  'use strict';

  angular
    .module('shopList')
    .directive('userMenu', userMenu);

  function userMenu() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/userMenu/userMenu.directive.html',
      scope: {
        user: '='
      },
      controller: function() {

      },
      controllerAs: 'vm',
      bindToController: true,
      replace: true
    };

    return directive;
  }
})();
