(function(){
    'use strict';

    describe('service ActiveItem', function() {
        var ActiveItem;

        beforeEach(module('shopList'));
        beforeEach(inject(function(_ActiveItem_) {
            ActiveItem = _ActiveItem_;
        }));

        it('should be registered', function() {
            expect(ActiveItem).not.toEqual(null);
        });

        describe('getItem function', function() {
            it('should exist', function() {
                expect(ActiveItem.getItem).not.toEqual(null);
            });
            it('should return data', function() {
                var list = ActiveItem.getItem();
                expect(list).toEqual(jasmine.any(Object));
            })
        });

        describe('setItem function', function() {
            it('should exist', function() {
                expect(ActiveItem.setItem).not.toEqual(null);
            });

            it('should set data', function() {
                var testItem = {
                    "name": "Test Item"
                };

                ActiveItem.setItem(testItem);
                var list = ActiveItem.getItem();
                expect(list === testItem).toBeTruthy();
            });
        });
    })
})();