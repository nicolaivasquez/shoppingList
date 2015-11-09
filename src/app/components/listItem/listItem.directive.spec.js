(function(){
  'use strict';

  describe('directive list-item', function(){
    var vm;
    var el;

    beforeEach(module('shopList'));
    beforeEach(inject(function($compile, $rootScope) {
      var scope = $rootScope.$new();

      el = angular.element('<list-item></list-item>');
      $compile(el)(scope);
      $rootScope.$digest();
      vm = el.isolateScope().vm;
    }));

    it('should compile', function() {
      expect(el.html()).not.toEqual(null);
      expect(el.html()).toBeDefined();
    });

    it('should have a link', function() {
      var itemLink = el.find('a');
      expect(itemLink.length).toBeGreaterThan(0);
    });
  });
})();
