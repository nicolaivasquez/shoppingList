(function(){
    'use strict';

    describe('service ActiveList', function() {
        var ActiveList;

        beforeEach(module('shopList'));
        beforeEach(inject(function(_ActiveList_) {
            ActiveList = _ActiveList_;
        }));

        it('should be registered', function() {
            expect(ActiveList).not.toEqual(null);
        });

        describe('getList function', function() {
            it('should exist', function() {
                expect(ActiveList.getList).not.toEqual(null);
            });
            it('should return data', function() {
                var list = ActiveList.getList();
                expect(list).toEqual(jasmine.any(Object));
            })
        });

        describe('setList function', function() {
            it('should exist', function() {
                expect(ActiveList.setList).not.toEqual(null);
            });

            it('should set data', function() {
                var testList = {
                    "name": "Test List"
                };

                ActiveList.setList(testList);
                var list = ActiveList.getList();
                expect(list === testList).toBeTruthy();
            });
        });
    })
})();