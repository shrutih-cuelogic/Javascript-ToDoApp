var commonServices = (function() {

    var logout = function() {
        localStorageServices.setLocalStorage("currentUser", "");
    }

    var clearAllCategories = function(category) {

        document.querySelectorAll('input[name="' + category + '"]')[0].checked = false;
        document.querySelectorAll('input[name="' + category + '"]')[1].checked = false;
        document.querySelectorAll('input[name="' + category + '"]')[2].checked = false;
        document.querySelectorAll('input[name="' + category + '"]')[3].checked = false;
    }

    var getCurrentUser = function() {
        return localStorageServices.getLocalStorage("currentUser");
    }

    var getAllItem = function(currentUser) {
        return localStorageServices.getLocalStorage(currentUser + "Items");
    }

    var setAllItem = function(currentUser, itemList) {
        return localStorageServices.setLocalStorage(currentUser + "Items", itemList);
    }

    var closeForm = function(formId) {
        document.getElementById(formId).setAttribute("hidden", "hidden");
    }

    var hideforms = function() {
        document.getElementById("addItemForm").setAttribute("hidden", "hidden");
        document.getElementById("editItemForm").setAttribute("hidden", "hidden");
    }

    var displayToDoItem = function(allItemList) {

        commonServices.hideforms();
        var itemHtml = "";

        if(!allItemList){
            document.getElementById('toDoList').innerHTML = "<h3> Result Not Found</h3>";
            return false;
        }

        if (allItemList) {
            allItemList.forEach(function(item, index, obj) {
                var isdone = '<li>';
                if (item["isDone"]) {
                    isdone = '<li class="done">';
                }
                itemHtml += isdone +
                    '<span class="handle ui-sortable-handle">' +
                    '<a href=""><i class="fa fa-ellipsis-v"></i></a>' +
                    '<i class="fa fa-ellipsis-v"></i>' +
                    '</span>&nbsp; ' +
                    '<input type="checkbox" value="' + index + '" id="item' + index + '"name="items">&nbsp;&nbsp;' +
                    '<span class="text">' + item["itemContent"] + '</span>' +
                    '<div class="tools">' +
                    '<a  onclick="editItemServices.editModal(' + index + ')"><i class="fa fa-edit"></i></a>&nbsp; &nbsp; ' +
                    '<a  onclick="deleteItemServices.deleteItem(' + index + ')"><i class="fa fa-trash-o"></i></a>' +
                    '</div>' +
                    '</li>';
            });
        }

        document.getElementById('toDoList').innerHTML = itemHtml;

    }

    var Reminder = function(divId, dateId, reminder) {

        document.getElementById(dateId).removeAttribute("required");
        document.getElementById(divId).setAttribute("hidden", "hidden");
        reminderDate = ""
        if (reminder.checked == true) {

            document.getElementById(divId).removeAttribute("hidden");
            document.getElementById(dateId).setAttribute("required", "required");
        }
    }

    var category = function(checkbox, category) {
        commonServices.clearAllCategories(category);
        checkbox.checked = true;
    }

    var service = {};
    service.logout = logout;
    service.Reminder = Reminder;
    service.clearAllCategories = clearAllCategories;
    service.displayToDoItem = displayToDoItem;
    service.getCurrentUser = getCurrentUser;
    service.getAllItem = getAllItem;
    service.setAllItem = setAllItem;
    service.closeForm = closeForm;
    service.hideforms = hideforms;
    service.category = category;
    return service;

})();