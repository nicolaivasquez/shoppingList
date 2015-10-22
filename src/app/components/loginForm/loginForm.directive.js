(function(){
  'use strict';

  angular
    .module('shopList')
    .directive('loginForm', loginForm);

  function loginForm() {
    var directive = {
      restrict: 'E',
      template: '<div>Login Here</div>',
      scope: {},
      controller: LoginFormController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    function LoginFormController() {
      var vm = this;
    }
  }
})();
