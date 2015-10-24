(function() {
  'use strict';

  angular
    .module('shopList')
    .config(config);

  /** @ngInject */
  function config($logProvider, toastrConfig, $authProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = false;
    toastrConfig.progressBar = true;

    // enable satellizer authentication
    $authProvider.facebook({
      clientId: '1707250906171201'
    });
    $authProvider.baseUrl = 'http://shoppinglist.app/';
  }

})();
