(function(){
  'use strict';

  angular
    .module('shopList')
    .directive('userMenu', userMenu);

  function userMenu() {
    var directive = {
      restrict: 'E',
      template: '<li>' +
        '<a href="#">{{vm.user.displayName}}</a>' +
      '</li>',
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
