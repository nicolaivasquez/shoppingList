(function() {
    'use strict';

    angular
        .module('shopList')
        .factory('ListService', ListService);

    /** @ngInject */
    function ListService($http, $log) {

        var apiEndpoint = 'http://shoppinglist.app/lists';

        var service = {
            getLists: getLists,
            getList: getList
        };

        return service;

        function getLists() {
            return $http.get(apiEndpoint).then(processLists);
        }

        function processLists(response) {
            return response.data.lists;
        }

        function getList(listSlug) {
            return $http.get(apiEndpoint + '/' + listSlug)
                .then(processList)
                .catch(processError);
        }

        function processList(response) {
            return response.data;
        }

        function processError(error) {
            $log.error('XHR failed to get list.\n' + angular.toJson(error.data, true));
        }
    }


})();
