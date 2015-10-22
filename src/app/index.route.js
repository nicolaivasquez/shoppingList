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
          templateUrl: 'app/root/root.html',
        })
          .state('root.login', {
            url: '^/login',
            views: {
              'content@root': {
                templateUrl: 'app/content/auth.html',
              },
              'auth@root.login': {
                template: '<login-form></login-form>',
              }
            }
          })
          .state('root.list', {
            url: '^/lists',
            resolve: {
              lists: function(ListService) {
                return ListService.getLists();
              },
              loginRequired: loginRequired
            },
            views: {
              'content@root': {
                templateUrl: 'app/content/content.html',
              },
              'lists@root.list': {
                template: '<list-column lists="listVm.data.lists"></list-column>',
                controller: function($scope, lists, ListService) {
                  var vm = this;
                  vm.data = {
                    lists: lists
                  };
                  $scope.$watch(function(){
                    return ListService.hasChanges;
                  }, function(newVal, oldVal){
                    if (newVal) {
                      ListService.getLists().then(function (response) {
                        vm.data.lists = response;
                      });
                    }
                  });
                },
                controllerAs: 'listVm'
              }
            }
          })
            .state('root.list.new', {
              url: '^/lists-add',
              views: {
                'detail@root.list': {
                  template: '<new-list list="newListVm.newList" save="newListVm.saveList()"></new-list>',
                  controller: function(ListService, toastr, $state) {
                    var vm = this;
                    vm.newList = {
                      "name": "",
                      "description": ""
                    };
                    vm.saveList = function() {
                      ListService.addList(vm.newList)
                          .then(function(list) {
                            ListService.hasChanges = true;
                            $state.transitionTo('root.list.selected', {list: list.slug});
                            toastr.success('Added new list');
                          }).catch(function(error) {
                            toastr.error('Error saving list!')
                          });
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
                'items@root.list': {
                  template: '<item-column list="selectedListItemVm.data.list" items="selectedListItemVm.data.items"></item-column>',
                  controller: function($scope, items, ActiveList, ItemService) {
                    var vm = this;
                    vm.data = {
                      list: ActiveList.getList(),
                      items: items
                    };
                    $scope.$watch(function(){
                      return ItemService.hasChanges;
                    }, function(newVal, oldVal){
                      if (newVal) {
                        ItemService.getItems(vm.data.list.slug).then(function (response) {
                          vm.data.items = response;
                        });
                      }
                    });
                  },
                  controllerAs: 'selectedListItemVm'
                },
                'detail@root.list': {
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
              .state('root.list.selected.newItem', {
                url: '^/lists/:list/items-add',
                views: {
                  'detail@root.list': {
                    template: '<new-item item="newItemVm.newItem" save="newItemVm.saveItem()"></new-item>',
                    controller: function(ItemService, toastr, $state, ActiveList) {
                      var vm = this;
                      vm.list = ActiveList.getList();
                      vm.newItem = {
                        "name": "",
                        "description": "",
                        "completed": false
                      };
                      vm.saveItem = function() {
                        ItemService.addItem(vm.list.slug, vm.newItem)
                            .then(function(item) {
                              toastr.success('Added new item');
                              $state.transitionTo('root.list.selected.item', {list: item.list, item: item.slug});
                              ItemService.hasChanges = true;
                            }, function(error){
                              console.log(error);
                              toastr.error('Error saving item!')
                            });
                      }
                    },
                    controllerAs: 'newItemVm'
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
                  'detail@root.list': {
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

  function loginRequired($q, $location, $auth) {
    var deferred = $q.defer();
    if ($auth.isAuthenticated()) {
      deferred.resolve();
    } else {
      $location.path('/login');
    }
    return deferred.promise;
  }

})();
