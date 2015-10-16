(function() {
    'use strict';

    angular
        .module('shopList')
        .factory('ListService', ListService);

    /** @ngInject */
    function ListService($http, $log) {

        var apiEndpoint = 'http://shoppinglist.app/lists';

        var service = {
            hasChanges: false,
            getLists: getLists,
            getList: getList,
            addList: addList
        };

        return service;

        function getLists() {
            return $http.get(apiEndpoint)
                .then(processLists)
                .catch(function(error) {
                    processError(error, 'XHR failed to get lists');
                });
        }

        function processLists(response) {
            service.hasChanges = false;
            return response.data.lists;
        }

        function getList(listSlug) {
            return $http.get(apiEndpoint + '/' + listSlug)
                .then(processList)
                .catch(function(error) {
                    processError(error, 'XHR failed to get list');
                });
        }

        function processList(response) {
            service.hasChanges = false;
            return response.data;
        }

        function processError(error, message) {
            service.hasChanges = false;
            if (!message) {
                message = "Error with list";
            }
            $log.error(message + '\n' + angular.toJson(error.data, true));
            throw error;
        }

        function addList(list) {
            $log.debug("Sending new list");
            return $http.post(apiEndpoint, list)
                .then(processList)
                .catch(function(error) {
                   processError(error, "XHR failed to post list");
                });
        }
    }


})();
