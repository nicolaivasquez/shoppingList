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
              list: function(ListService) {
                return ListService.getLists();
              }
            },
            views: {
              'content': {
                template: '<div>Hello</div>'
              }
            }
          });

    $urlRouterProvider.otherwise('/');
  }

})();
