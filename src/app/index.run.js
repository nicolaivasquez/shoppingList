(function() {
  'use strict';

  angular
    .module('shopList')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
