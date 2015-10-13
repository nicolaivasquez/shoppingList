(function() {
    'use strict';

    describe('directive list-column', function() {
        var vm;
        var el;
        var testList = {
            "name": "Test List",
            "description": "This is a test list",
            "slug": "test-list",
            "url": "http://shoppinglist.app/lists/test-list"
        };

        beforeEach(module('shopList'));
        beforeEach(inject(function($compile, $rootScope){
            var scope = $rootScope.$new();
            scope.list = testList;

            el = angular.element('<list-column lists="list"></list-column>');
            $compile(el)(scope);
            $rootScope.$digest();
            vm = el.isolateScope().vm;
        }));

        it('should be compiled', function() {
            expect(el.html()).not.toEqual(null);
        });

        it('should have isolate scope', function() {
            expect(vm).toEqual(jasmine.any(Object));
            expect(vm.lists).toEqual(jasmine.any(Object));
            expect(vm.lists).toEqual(testList);
        });
    });
})();