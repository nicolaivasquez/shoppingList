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
                controller: function($scope, lists) {
                  var vm = this;
                  vm.data = {
                    lists: lists
                  };
                },
                controllerAs: 'listVm'
              }
            }
          })
            .state('root.list.new', {
              url: '^/lists-add',
              views: {
                'detail@root': {
                  template: '<new-list list="newListVm.newList" save="newListVm.saveList()"></new-list>',
                  controller: function() {
                    var vm = this;
                    vm.newList = {
                      "name": "",
                      "description": ""
                    };
                    vm.saveList = function() {
                      console.log(vm.newList);
                    }
                  },
                  controllerAs: 'newListVm'
                }
              }
            })
            .state('root.list.selected', {
              url: '^/lists/:list',
              resolve: {
                list: function($stateParams, ListService, ActiveList) {
                  return ListService.getList($stateParams.list).then(function(list){
                    ActiveList.setList(list);
                    return list;
                  });
                },
                items: ['list', 'ItemService', 'ActiveList', function(list, ItemService, ActiveList) {
                  return ItemService.getItems(ActiveList.getList().slug);
                }]
              },
              views: {
                'items@root': {
                  template: '<item-column list="selectedListItemVm.data.list" items="selectedListItemVm.data.items"></item-column>',
                  controller: function(items, ActiveList) {
                    var vm = this;
                    vm.data = {
                      list: ActiveList.getList(),
                      items: items
                    };
                  },
                  controllerAs: 'selectedListItemVm'
                },
                'detail@root': {
                  template: '<detail-column list="selectedListDetailVm.data.list"></detail-column>',
                  controller: function(ActiveList) {
                    var vm = this;
                    vm.data = {
                      list: ActiveList.getList()
                    };
                  },
                  controllerAs: 'selectedListDetailVm'
                }
              }
            })
              .state('root.list.selected.item', {
                url: '^/lists/:list/items/:item',
                parent: 'root.list.selected',
                resolve: {
                  item: function($stateParams, ItemService, ActiveItem) {
                    return ItemService.getItem($stateParams.list, $stateParams.item).then(function(item){
                      ActiveItem.setItem(item);
                    });
                  }
                },
                views: {
                  'detail@root': {
                    template: '<detail-column list="selectedItemDetailVm.data.list" item="selectedItemDetailVm.data.item"></detail-column>',
                    controller: function($scope, ActiveItem, ActiveList) {
                      var vm = this;
                      vm.data = {
                        list: ActiveList.getList(),
                        item: ActiveItem.getItem()
                      };
                    },
                    controllerAs: 'selectedItemDetailVm'
                  }
                }
              });

    $urlRouterProvider.otherwise('/');
  }

})();
