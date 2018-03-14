var registrationServices = (function() {

    var img;

    document.getElementById("registration_form").onsubmit = function() {

        var username = document.getElementById("username").value;
        var first_name = document.getElementById("first_name").value;
        var last_name = document.getElementById("last_name").value;
        var address = document.getElementById("address").value;
        var password1 = document.getElementById("password1").value;
        var password2 = document.getElementById("password2").value;
        document.getElementById("genderError").innerHTML = "";
        document.getElementById("password2Error").innerHTML = "";
        document.getElementById("usernameError").innerHTML = "";
        var gender;

        var form = this;
        if ((form.gender[0].checked == false) && (form.gender[1].checked == false) && (form.gender[2].checked == false)) {
            document.getElementById("genderError").innerHTML = "<span style='color: red;'>Please choose your Gender</span>";
            return false;
        }
        if (password1 != password2) {
            document.getElementById("password2Error").innerHTML = "<span style='color: red;'>password should be same as previous</span>";
            return false;
        }


        if (form.gender[0].checked == true) {
            gender = form.gender[0].value;
        } else if (form.gender[1].checked == true) {
            gender = form.gender[1].value;
        } else {
            gender = form.gender[2].value;
        }
        if (localStorageServices.getLocalStorage("AllUsers") === null) {
            allUsersList = []
            allUsersList.push(username)
            localStorageServices.setLocalStorage("AllUsers", allUsersList);
        } else {
            allUsersList = localStorageServices.getLocalStorage("AllUsers");
            if (allUsersList.indexOf(username) === -1) {
                allUsersList.push(username)
                localStorageServices.setLocalStorage("AllUsers", allUsersList);
            } else {
                document.getElementById("usernameError").innerHTML = "<span style='color: red;'>User already exist</span>";
                return false
            }
        }
        setUserDetails(username, first_name, last_name, gender, address, password1);


    }

    var setUserDetails = function(username, first_name, last_name, gender, address, password1) {

        var user = { "username": username, "first_name": first_name, "last_name": last_name, "gender": gender, "address": address, "password": password1, "image": img };
        localStorageServices.setLocalStorage(username, user);
        localStorageServices.setLocalStorage("currentUser", username);

    }

    var setProfileImage = function(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('profile_img').removeAttribute("hidden");
                document.getElementById('profile_img')
                    .setAttribute('src', e.target.result);
                img = e.target.result;

            };
            reader.readAsDataURL(input.files[0]);
        }
    }

    var service = {};
    service.setUserDetails = setUserDetails;
    service.setProfileImage = setProfileImage;

    return service;

})();