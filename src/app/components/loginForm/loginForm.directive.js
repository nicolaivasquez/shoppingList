(function(){
  'use strict';

  angular
    .module('shopList')
    .directive('loginForm', loginForm);

  function loginForm() {
    var directive = {
      restrict: 'E',
      template: '<div><button class="btn btn-block btn-social btn-facebook" ng-click="vm.authenticate()">Sign in with Facebook</button></div>',
      scope: {},
      controller: LoginFormController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    function LoginFormController($auth, toastr, $location) {
      var vm = this;

      vm.authenticate = function() {
        $auth.authenticate('facebook')
          .then(function(){
            toastr.success('You have successfully signed in with Facebook');
            $location.path('/lists');
          })
          .catch(function(response){
            toastr.error(response.data.message);
          });
      };
    }
  }
})();
