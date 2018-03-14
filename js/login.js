var loginServices = (function() {

    document.getElementById("login_form").onsubmit = function() {
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;
        var currentUser = localStorageServices.getLocalStorage(username);

        if (!currentUser || currentUser["password"] != password) {
            document.getElementById("Error").innerHTML = "<span style='color: red;'>Wrong credentials. try again</span>";
            return false;
        }

        localStorageServices.setLocalStorage("currentUser", currentUser["username"]);
    }

    var service = {};
    return service;

})();