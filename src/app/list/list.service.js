(function() {
    'use strict';

    angular
        .module('shopList')
        .factory('ListService', ListService);

    /** @ngInject */
    function ListService($http) {

        var api = 'http://shoppinglist.app/lists';

        var service = {
            getLists: getLists,
            getList: getList
        };

        return service;

        function getLists() {
            return $http.get(api).then(processLists);
        }

        function processLists(response) {
            return response.data.lists;
        }

        function getList(listSlug) {
            return $http.get(api + '/' + listSlug).then(processList);
        }

        function processList(response) {
            return response.data;
        }
    }


})();
