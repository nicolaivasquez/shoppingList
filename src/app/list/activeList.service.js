(function(){
    'use strict';

    angular
        .module('shopList')
        .factory('ActiveList', ActiveList);

    function ActiveList() {
        var activeList = {};

        var service = {
            getList: getList,
            setList: setList
        };

        return service;

        function getList() {
            return activeList;
        }

        function setList(list) {
            activeList = list;
        }
    }
})();