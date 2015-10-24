(function(){
  'use strict';

  describe('directive user-menu', function(){
    var vm;
    var el;

    beforeEach(module('shopList'));
    beforeEach(inject(function($compile, $rootScope) {
      var scope = $rootScope.$new();

      el = angular.element('<user-menu></user-menu>');
      $compile(el)(scope);
      $rootScope.$digest();
      vm = el.isolateScope().vm;
    }));

    it('should be compiled', function() {
      expect(el.html()).not.toEqual(null);
    });
  });
})();
