(function() {
    'use strict';

    describe('directive detail-column', function(){
        var vm;
        var el;
        var testList = {
            "name": "Test List",
            "description": "This is a test list",
            "slug": "test-list",
            "url": "http://shoppinglist.app/lists/test-list"
        };
        var testItem = {
            "name": "Test Item 1",
            "description": "This is the first test item",
            "slug": "test-item-1",
            "completed": 0,
            "list": "test-list",
            "url": "http://shoppinglist.app/lists/test-list/items/test-item-1"
        };

        beforeEach(module('shopList'));
        beforeEach(inject(function($compile, $rootScope) {
            var scope = $rootScope.$new();
            scope.list = testList;
            scope.item = testItem;

            el = angular.element('<detail-column list="list" item="item"></detail-column>');
            $compile(el)(scope);
            $rootScope.$digest();
            vm = el.isolateScope().vm;
        }));

        it('should be compiled', function() {
           expect(el.html()).not.toEqual(null);
        });

        it('should have isolate scope', function() {
            expect(vm).toEqual(jasmine.any(Object));
            expect(vm.list).toEqual(jasmine.any(Object));
            expect(vm.list).toEqual(testList);
            expect(vm.item).toEqual(jasmine.any(Object));
            expect(vm.item).toEqual(testItem);
        });
    });
})();