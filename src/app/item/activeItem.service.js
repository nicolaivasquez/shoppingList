(function(){
    'use strict';

    angular
        .module('shopList')
        .factory('ActiveItem', ActiveItem);

    function ActiveItem() {
        var activeItem = {};

        var service = {
            getItem: getItem,
            setItem: setItem
        };

        return service;

        function getItem() {
            return activeItem;
        }

        function setItem(item) {
            activeItem = item;
        }
    }
})();