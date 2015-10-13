(function() {
  'use strict';

  angular
    .module('shopList')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('root', {
          url: '/',
          templateUrl: 'app/root/root.html'
        })
          .state('root.list', {
            url: '^/lists',
            resolve: {
              lists: function(ListService) {
                return ListService.getLists();
              }
            },
            views: {
              'lists': {
                template: '<list-column lists="vm.data.lists"></list-column>',
                controller: function(lists) {
                  var vm = this;
                  vm.data = {
                    lists: lists
                  }
                },
                controllerAs: 'vm'
              }
            }
          });

    $urlRouterProvider.otherwise('/');
  }

})();
