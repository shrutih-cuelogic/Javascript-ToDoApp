var deleteItemServices = (function() {

    var currentUser = commonServices.getCurrentUser(),
        allItemList = commonServices.getAllItem(currentUser);

    var deleteItem = function(index) {
        allItemList.splice(index, 1);
        commonServices.setAllItem(currentUser, allItemList);
        commonServices.displayToDoItem(allItemList);
    }

    var bulkDelete = function() {

        commonServices.hideforms();
        var checkboxes = document.getElementsByName("items");
        var deleteIndexArray = [];

        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                deleteIndexArray.push(checkboxes[i].value);
            }
        }


        if(deleteIndexArray.length == 0){
            alert("Please select items to delete");
            return false;
        }

        for (var i = deleteIndexArray.length - 1; i >= 0; i--) {
            allItemList.splice(deleteIndexArray[i], 1);
        }

        commonServices.setAllItem(currentUser, allItemList);
        commonServices.displayToDoItem(allItemList);
    }

    var service = {};
    service.deleteItem = deleteItem;
    service.bulkDelete = bulkDelete;
    return service;

})();