(function(){
  'use strict';

  angular
    .module('shopList')
    .factory('AccountService', AccountService);

  function AccountService($http, $log) {
    var api = "http://shoppinglist.app";

    var service = {
      getProfile: getProfile
    };

    return service;

    function getProfile() {
      return $http.get(api + '/auth/me')
        .then(processProfile)
        .catch(function(error){
          processError(error, "XHR failed to get profile");
        });
    }

    function processProfile(response) {
      return response.data;
    }

    function processError(error, message) {
      if (!message) {
        message = "Error with profile";
      }
      $log.error(message + '\n' + angular.toJson(error.data, true));
      throw error;
    }
  }
})();
