(function() {
    'use strict';

    angular
        .module('shopList')
        .factory('ItemService', ItemService);

    function ItemService($http, $log) {

        var api = 'http://shoppinglist.app/lists';

        var service = {
            getItems: getItems,
            getItem: getItem
        };

        return service;

        function getItems(listSlug) {
            return $http.get(api + '/' + listSlug + '/items')
                .then(processItems)
                .catch(processError);
        }

        function processItems(response) {
            return response.data.items;
        }

        function processError(error) {
            $log.error('XHR failed to get items.\n' + angular.toJson(error.data, true));
        }

        function getItem(listSlug, itemSlug) {
            return $http.get(api + '/' + listSlug + '/items/' + itemSlug)
                .then(processItem)
                .catch(processError);
        }

        function processItem(response) {
            return response.data;
        }

    }
})();