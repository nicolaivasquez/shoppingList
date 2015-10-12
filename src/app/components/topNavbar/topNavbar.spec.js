(function() {
    'use strict';

    describe('directive topNavbar', function() {
        //var vm;
        var el;

        beforeEach(module('shopList'));
        beforeEach(inject(function($compile, $rootScope) {
            el = angular.element('<top-navbar></top-navbar>');

            $compile(el)($rootScope.$new());
            $rootScope.$digest();
            //vm = el.isolateScope().vm;
        }));

        it('should be compiled', function() {
            expect(el.html()).not.toEqual(null);
        });
    });
})();