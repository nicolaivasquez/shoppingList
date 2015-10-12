(function() {
    'use strict';

    angular
        .module('shopList')
        .factory('ListService', ListService);

    /** @ngInject */
    function ListService($http) {

        var api = 'http://shoppinglist.app/lists';

        var service = {
            getLists: getLists
        };

        return service;

        function getLists() {
            return $http.get(api).then(processLists);
        }

        function processLists(response) {
            return response.data.lists;
        }

    }


})();
