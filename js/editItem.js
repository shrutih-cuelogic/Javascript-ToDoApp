var editItemServices = (function() {

    var currentUser = commonServices.getCurrentUser(),
        allItemList = commonServices.getAllItem(currentUser);

    var editModal = function(index) {

        commonServices.clearAllCategories("editCategory");
        commonServices.closeForm("addItemForm");

        document.getElementById("editItemForm").removeAttribute("hidden");
        document.getElementById("editReminderDateDiv").setAttribute("hidden", "hidden");
        document.getElementById("editReminderDate").value = "";

        var item = allItemList[index]

        document.getElementById("itemIndex").value = index;
        document.getElementById("editItemContent").value = item["itemContent"];
        if (item["category"]) {
            document.getElementById(item["category"]).checked = true;
        }
        document.getElementById("editDueDate").value = item["dueDate"];
        document.getElementById("editIsReminder").checked = item["isReminder"];
        if (item["isReminder"]) {
            document.getElementById("editReminderDateDiv").removeAttribute("hidden");
            document.getElementById("editReminderDate").value = item["reminderDate"];
        }
        document.getElementById("editIspublic").checked = item["ispublic"];
        document.getElementById("editIsDone").checked = item["isDone"];
    }

    document.getElementById("editItemForm").onsubmit = function() {

        itemContent = document.getElementById("editItemContent").value;
        dueDate = document.getElementById("editDueDate").value;
        ispublic = document.getElementById("editIspublic").checked;
        isReminder = document.getElementById("editIsReminder").checked;
        reminderDate = document.getElementById('editReminderDate').value;
        isDone = document.getElementById("editIsDone").checked;
        index = document.getElementById("itemIndex").value;
        category = editCategoryValue(this);

        updateItem(index);
        commonServices.closeForm("editItemForm");
        commonServices.clearAllCategories("editCategory");
    }

    var editCategoryValue = function(form) {
        if (form.editCategory[0].checked == true) {
            return form.editCategory[0].value;
        } else if (form.editCategory[1].checked == true) {
            return form.editCategory[1].value;
        } else if (form.editCategory[2].checked == true) {
            return form.editCategory[2].value;
        } else if (form.editCategory[3].checked == true) {
            return form.editCategory[3].value;
        }
    }

    var updateItem = function(index) {

        allItemList[index] = {
            "itemContent": itemContent,
            "category": category,
            "dueDate": dueDate,
            "isReminder": isReminder,
            "reminderDate": reminderDate,
            "ispublic": ispublic,
            "isDone": isDone
        }

        commonServices.setAllItem(currentUser, allItemList);
        commonServices.displayToDoItem(allItemList)
    }

    var service = {};
    service.editModal = editModal;
    return service;

})();