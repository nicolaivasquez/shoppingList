(function(){
  'use strict';

  describe('service AccountService', function() {
    var AccountService;
    var $httpBackend;
    var $log;

    beforeEach(module('shopList'));
    beforeEach(inject(function(_AccountService_, _$httpBackend_, _$log_){
      AccountService = _AccountService_;
      $httpBackend = _$httpBackend_;
      $log = _$log_;
    }));

    it('should be registered', function(){
      expect(AccountService).not.toEqual(null);
    });

    describe('getProfile function', function(){
      it('should exist', function(){
        expect(AccountService.getProfile).not.toEqual(null);
        expect(AccountService.getProfile).not.toEqual(undefined);
      });

      it('should return data', function(){
        var testData = {
          "id" : 1,
          "email" : "test@example.com",
          "displayName" : "David Alajehjeejffd Carrierosen",
          "facebook" : "101879556841396"
        }
        $httpBackend.when('GET', 'http://shoppinglist.app/auth/me').respond(200, testData);
        var data;
        AccountService.getProfile().then(function(fetchedData){
          data = fetchedData;
        });
        $httpBackend.flush();
        expect(data).toEqual(jasmine.any(Object));
        expect(data).toEqual(testData);
      });
    });
  });
})();
