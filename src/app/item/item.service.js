(function() {
    'use strict';

    angular
        .module('shopList')
        .factory('ItemService', ItemService);

    function ItemService($http, $log) {

        var api = 'http://shoppinglist.app/lists';

        var service = {
            getItems: getItems,
            getItem: getItem,
            addItem: addItem
        };

        return service;

        function getItems(listSlug) {
            return $http.get(api + '/' + listSlug + '/items')
                .then(processItems)
                .catch(function(error) {
                    processError(error, "XHR failed to get items");
                });
        }

        function processItems(response) {
            return response.data.items;
        }

        function processError(error, message) {
            service.hasChanges = false;
            if (!message) {
                message = "Error with list";
            }
            $log.error(message + '\n' + angular.toJson(error.data, true));
        }

        function getItem(listSlug, itemSlug) {
            return $http.get(api + '/' + listSlug + '/items/' + itemSlug)
                .then(processItem)
                .catch(function(error) {
                    processError(error, "XHR failed to get item");
                });
        }

        function processItem(response) {
            return response.data;
        }

        function addItem(listSlug, item) {
            $log.debug("Sending new item");
            return $http.post(api + '/' + listSlug + '/items', item)
                .then(processItem)
                .catch(function(error) {
                    processError(error, "XHR failed to post item");
                });
        }

    }
})();