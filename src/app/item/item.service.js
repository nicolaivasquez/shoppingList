(function() {
    'use strict';

    angular
        .module('shopList')
        .factory('ItemService', ItemService);

    function ItemService($http) {

        var api = 'http://shoppingList.app/lists';

        var service = {
            getItems: getItems
        };

        return service;

        function getItems(listSlug) {
            return $http.get(api + '/' + listSlug + '/items').then(processItems);
        }

        function processItems(response) {
            return response.data.items;
        }

    }
})();