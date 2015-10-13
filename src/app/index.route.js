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
              'lists@root': {
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
          })
            .state('root.list.selected', {
              url: '^/lists/:list',
              resolve: {
                list: function($stateParams, ListService) {
                  return ListService.getList($stateParams.list);
                },
                items: function($stateParams, ItemService) {
                  return ItemService.getItems($stateParams.list);
                }
              },
              views: {
                'items@root': {
                  template: '<item-column list="vm.data.list" items="vm.data.items"></item-column>',
                  controller: function(list, items) {
                    var vm = this;
                    vm.data = {
                      list: list,
                      items: items
                    }
                    console.log(vm.data);
                  },
                  controllerAs: 'vm'
                },
                'detail@root': {
                  template: '<div>Detail Here</div>'
                }
              }
            });

    $urlRouterProvider.otherwise('/');
  }

})();
