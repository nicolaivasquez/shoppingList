(function(){
  'use strict';

  angular
    .module('shopList')
    .directive('userMenu', userMenu);

  function userMenu() {
    var directive = {
      restrict: 'E',
      template: '<li>' +
        '<a href="#">User Profile Here</a>' +
      '</li>',
      scope: {},
      controller: function() {

      },
      controllerAs: 'vm',
      bindToController: true,
      replace: true
    };

    return directive;
  }
})();
