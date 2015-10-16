(function() {
    'use strict';

    describe('service ListService', function() {
        var ListService;
        var $httpBackend;
        var $log;

        beforeEach(module('shopList'));
        beforeEach(inject(function(_ListService_, _$httpBackend_, _$log_) {
            ListService = _ListService_;
            $httpBackend = _$httpBackend_;
            $log = _$log_;
        }));

        it('should be registered', function() {
           expect(ListService).not.toEqual(null);
        });

        describe('hasChanges property', function() {
           it('should exist', function() {
                expect(ListService.hasChanges).not.toBe(null);
                expect(typeof ListService.hasChanges).toEqual('boolean');
           });
        });

        describe('getLists function', function() {
           it('should exist', function() {
               expect(ListService.getLists).not.toEqual(null);
           });

           it('should return data', function() {
               var testData = {
                   "lists": [
                       {
                           list: 1
                       }
                   ]
               };
               $httpBackend.when('GET', 'http://shoppinglist.app/lists').respond(200, testData);
               var data;
               ListService.getLists().then(function(fetchedData) {
                  data = fetchedData;
               });
               $httpBackend.flush();
               expect(data).toEqual(jasmine.any(Array));
               expect(data.length === testData.lists.length).toBeTruthy();
               expect(data[0]).toEqual(jasmine.any(Object));
           });
        });

        describe('getList function', function() {
            it('should exist', function() {
                expect(ListService.getList).not.toEqual(null);
            });

            it('should return data', function() {
                var testData = {
                    name: 'TestList'
                };
                $httpBackend.when('GET', 'http://shoppinglist.app/lists/test-list').respond(200, testData);
                var data;
                ListService.getList('test-list').then(function(fetchedData) {
                   data = fetchedData;
                });
                $httpBackend.flush();
                expect(data).toEqual(jasmine.any(Object));
                expect(data.length === testData.length).toBeTruthy();
            });

            it('should log error', function() {
                $httpBackend.when('GET', 'http://shoppinglist.app/lists/no-list').respond(404);
                ListService.getList('no-list');
                $httpBackend.flush();
                expect($log.error.logs).toEqual(jasmine.stringMatching('failed'));
            });
        });

        describe('addList function', function() {
            it ('should exist', function() {
                expect(angular.isFunction(ListService.addList)).toBe(true);
            });

            it('should send list data and receive a response', function() {
                var sentData = {
                    "name": "Test List",
                    "description": "This is a test list"
                };
                var returnData = angular.copy(sentData);
                returnData.slug = "test-list";

                $httpBackend.when('POST', 'http://shoppinglist.app/lists', sentData).respond(201, returnData);

                var data;
                ListService.addList(sentData, function(response) {
                    data = response;
                    expect(data).toEqual(returnData);
                });
                $httpBackend.flush();
            });

            it('should log error', function() {
                var sentData = {
                    "name": "Test List",
                    "description": "This is a test list"
                };
                $httpBackend.when('POST', 'http://shoppinglist.app/lists', sentData).respond(400);
                ListService.addList(sentData, function(response) {
                    expect($log.error.logs).toEqual(jasmine.stringMatching('failed'));
                });
                $httpBackend.flush();

            });
        });
    });

})();