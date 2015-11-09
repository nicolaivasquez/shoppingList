(function(){
  'use strict';

  angular
    .module('shopList')
    .directive('listItem', listItem);

  function listItem() {
    var directive = {
      restrict: 'E',
      scope: {
        item: "="
      },
      replace: true,
      templateUrl: 'app/components/listItem/listItem.directive.html',
      controller: listItemController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    function listItemController() {
      var vm = this;
    }
  }
})();
