var commonServices = (function() {

    var logout = function() {
        localStorageServices.setLocalStorage("currentUser", "");
    }

    var service = {};
    service.logout = logout;

    return service;

})();