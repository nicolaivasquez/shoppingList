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
                template: '<list-column lists="listVm.data.lists"></list-column>',
                controller: function(lists) {
                  var vm = this;
                  vm.data = {
                    lists: lists
                  }
                },
                controllerAs: 'listVm'
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
                  template: '<item-column list="selectedListItemVm.data.list" items="selectedListItemVm.data.items"></item-column>',
                  controller: function(list, items) {
                    var vm = this;
                    vm.data = {
                      list: list,
                      items: items
                    };
                  },
                  controllerAs: 'selectedListItemVm'
                },
                'detail@root': {
                  template: '<detail-column list="selectedListDetailVm.data.list"></detail-column>',
                  controller: function(list) {
                    var vm = this;
                    vm.data = {
                      list: list
                    };
                  },
                  controllerAs: 'selectedListDetailVm'
                }
              }
            });

    $urlRouterProvider.otherwise('/');
  }

})();
