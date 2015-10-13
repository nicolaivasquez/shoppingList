(function() {
    'use strict';

    describe('directive item-column', function() {
        var vm;
        var el;
        var testList = {
            "name": "Test List",
            "description": "This is a test list",
            "slug": "test-list",
            "url": "http://shoppinglist.app/lists/test-list"
        };
        var testItems = [
            {
                "name": "Test Item 1",
                "description": "This is the first test item",
                "slug": "test-item-1",
                "completed": 0,
                "list": "test-list",
                "url": "http://shoppinglist.app/lists/test-list/items/test-item-1"
            },
            {
                "name": "Test Item 2",
                "description": "This is the second test item",
                "slug": "test-item-2",
                "completed": 1,
                "list": "test-list",
                "url": "http://shoppinglist.app/lists/test-list/items/test-item-2"
            }
        ];

        beforeEach(module('shopList'));
        beforeEach(inject(function($compile, $rootScope){
            var scope = $rootScope.$new();
            scope.list = testList;
            scope.items = testItems;

            el = angular.element('<item-column list="list" items="items"></item-column>');
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
            expect(vm.items).toEqual(jasmine.any(Array));
            expect(vm.items).toEqual(testItems);
        });
    });
})();