(function() {
    'use strict';

    describe('directive new-item', function() {
        var vm;
        var el;

        beforeEach(module('shopList'));
        beforeEach(inject(function($compile, $rootScope) {
            var scope = $rootScope.$new();

            el = angular.element('<new-item></new-item>');
            $compile(el)(scope);
            $rootScope.$digest();
            vm = el.isolateScope().vm;
        }));

        it('should be compiled', function() {
            expect(el.html()).not.toEqual(null);
        });

        it('should create form', function() {
            var form = el.find('form');
            expect(form.length).toEqual(1);
        });
    });
})();