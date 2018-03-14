var profilePageServices = (function() {

	var currentUser = localStorageServices.getLocalStorage("currentUser");
	
    var getcurrentUserobject = function() {        
        return localStorageServices.getLocalStorage(currentUser);
    }

    var currentUserObject = getcurrentUserobject();
    document.getElementById("usernameNav").innerHTML = currentUserObject["username"];
    document.getElementById("userProfile").setAttribute('src', currentUserObject["image"]);
    document.getElementById("first_name").value = currentUserObject["first_name"];
    document.getElementById("last_name").value = currentUserObject["last_name"];
    document.getElementById("address").value = currentUserObject["address"];
    document.getElementById(currentUserObject["gender"]).checked = true;

    var changeFirstName = function(first_name) {
        currentUserObject["first_name"] = first_name.value;
        localStorageServices.setLocalStorage(currentUser, currentUserObject);

    }
    var changeLastName = function(last_name) {
        currentUserObject["last_name"] = last_name.value;
        localStorageServices.setLocalStorage(currentUser, currentUserObject);

    }
    var changeGender = function(gender) {
        currentUserObject["gender"] = gender.value;
        localStorageServices.setLocalStorage(currentUser, currentUserObject);

    }
    var changeAddress = function(address) {
        currentUserObject["address"] = address.value;
        localStorageServices.setLocalStorage(currentUser, currentUserObject);
    }

    var changeProfileImage = function(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function(e) {
                document.getElementById('userProfile').setAttribute('src', e.target.result);
                currentUserObject['image'] = e.target.result;
                localStorageServices.setLocalStorage(currentUser, currentUserObject);
            };
            reader.readAsDataURL(input.files[0]);
        }
    }

    var service = {};

    service.changeFirstName = changeFirstName;
    service.changeLastName = changeLastName;
    service.changeGender = changeGender;
    service.changeAddress = changeAddress;
    service.changeProfileImage = changeProfileImage;

    return service;

})();