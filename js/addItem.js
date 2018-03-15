var addItemServices = (function() {

    var isReminder, reminderDate, itemContent, dueDate,
        ispublic, isReminder, allItemList, isDone = false,
        category = "",
        currentUser = commonServices.getCurrentUser();
    document.getElementById("usernameNav").innerHTML = currentUser;

    document.getElementById("addItemForm").onsubmit = function() {

        itemContent = document.getElementById("itemContent").value;
        dueDate = document.getElementById("dueDate").value;
        ispublic = document.getElementById("ispublic").checked;
        isReminder = document.getElementById("isReminder").checked;
        reminderDate = document.getElementById("reminderDate").value;
        category = categoryValue(this);

        storeToDoItem();
        commonServices.closeForm("addItemForm");
    }

    var storeToDoItem = function() {

        item = {
            "itemContent": itemContent,
            "category": category,
            "dueDate": dueDate,
            "isReminder": isReminder,
            "reminderDate": reminderDate,
            "ispublic": ispublic,
            "isDone": isDone
        }
        if (commonServices.getAllItem(currentUser) === null) {
            allItemList = []
            allItemList.push(item)
            commonServices.setAllItem(currentUser, allItemList);
        } else {
            allItemList = commonServices.getAllItem(currentUser);
            allItemList.push(item)
            commonServices.setAllItem(currentUser, allItemList);
        }

        commonServices.displayToDoItem(allItemList);
    }

    var categoryValue = function(form) {

        if (form.category[0].checked == true) {
            return form.category[0].value;
        } else if (form.category[1].checked == true) {
            return form.category[1].value;
        } else if (form.category[2].checked == true) {
            return form.category[2].value;
        } else if (form.category[3].checked == true) {
            return form.category[3].value;
        }
    }

    commonServices.displayToDoItem(commonServices.getAllItem(currentUser));

    var addItem = function() {

        commonServices.closeForm("editItemForm");
        document.getElementById("addItemForm").removeAttribute("hidden");
        commonServices.clearAllCategories("category");
    }

    var service = {};
    service.addItem = addItem;
    return service;

})();