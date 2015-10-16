(function() {
    'use strict';

    describe('service ItemService', function() {
        var ItemService;
        var $httpBackend;
        var $log;

        beforeEach(module('shopList'));
        beforeEach(inject(function(_ItemService_, _$httpBackend_, _$log_) {
            ItemService = _ItemService_;
            $httpBackend = _$httpBackend_;
            $log = _$log_;
        }));

        it('should be registered', function() {
            expect(ItemService).not.toEqual(null);
        });

        describe('getItems function', function() {
            it('should exist', function() {
                expect(ItemService.getItems).not.toEqual(null);
            });

            it('should return data', function() {
                var testData = {
                    "items": [
                        {
                            "name": "Item 1"
                        }
                    ]
                };
                $httpBackend.when('GET', 'http://shoppinglist.app/lists/list-1/items').respond(200, testData);
                var data;
                ItemService.getItems('list-1').then(function(fetchedData){
                    data = fetchedData;
                });
                $httpBackend.flush();
                expect(data).toEqual(jasmine.any(Array));
                expect(data.length === testData.items.length).toBeTruthy();
                expect(data[0]).toEqual(jasmine.any(Object));
            });

            it('should log error', function() {
                $httpBackend.when('GET', 'http://shoppinglist.app/lists/no-list/items').respond(404);
                ItemService.getItems('no-list');
                $httpBackend.flush();
                expect($log.error.logs).toEqual(jasmine.stringMatching('failed'));
            });
        });

        describe('getItem function', function() {
            it('should exist', function() {
                expect(ItemService.getItem).not.toEqual(null);
            });

            it('should return data', function() {
                var testData = {
                    "name": "Item 1"
                };
                $httpBackend.when('GET', 'http://shoppinglist.app/lists/list-1/items/item-1').respond(200, testData);
                var data;
                ItemService.getItem('list-1', 'item-1').then(function(fetchedData){
                    data = fetchedData;
                });
                $httpBackend.flush();
                expect(data).toEqual(jasmine.any(Object));
                expect(data.length === testData.length).toBeTruthy();
            });

            it('should log error', function() {
                $httpBackend.when('GET', 'http://shoppinglist.app/lists/no-list/items/no-item').respond(404);
                ItemService.getItem('no-list', 'no-item');
                $httpBackend.flush();
                expect($log.error.logs).toEqual(jasmine.stringMatching('failed'));
            });
        });

        describe('addItem function', function() {
            it('should exist', function() {
                expect(angular.isFunction(ItemService.addItem)).toBe(true);
            });

            it('should send item data and get a response', function() {
                var sentData = {
                    "name": "Item 1",
                    "description": "This is a test item",
                    "completed": false
                };
                var returnData = angular.copy(sentData);
                returnData.slug = "item-1";
                returnData.list = "list-1";

                $httpBackend.when('POST', 'http://shoppinglist.app/lists/list-1/items', sentData).respond(201, returnData);
                var data;
                ItemService.addItem('list-1', sentData).then(function(response) {
                    data = response;
                });
                $httpBackend.flush();
                expect(data).toEqual(returnData);
            });

            it('should log error', function() {
                var sentData = {
                    "name": "Item 1",
                    "description": "This is a test item",
                    "completed": false
                };
                $httpBackend.when('POST', 'http://shoppinglist.app/lists/list-1/items', sentData).respond(400);
                ItemService.addItem('list-1', sentData)
                    .catch();
                $httpBackend.flush();
                expect($log.error.logs).toEqual(jasmine.stringMatching('failed'));
            });
        });
    });
})();