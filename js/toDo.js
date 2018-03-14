var toDoServices = (function() {

    var isReminder, reminderDate, itemContent, dueDate, ispublic, isReminder, allItemList;
    var isDone = false,
        category = "",
        currentUser = localStorageServices.getLocalStorage("currentUser");
    document.getElementById("usernameNav").innerHTML = currentUser;


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
        closeForm("editItemForm");
        clearAllCategories("editCategory");
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

        setAllItem(allItemList);
        displayToDoItem(allItemList)
    }

    document.getElementById("addItemForm").onsubmit = function() {

        itemContent = document.getElementById("itemContent").value;
        dueDate = document.getElementById("dueDate").value;
        ispublic = document.getElementById("ispublic").checked;
        isReminder = document.getElementById("isReminder").checked;
        reminderDate = document.getElementById("reminderDate").value;
        category = categoryValue(this);

        storeToDoItem();
        closeForm("addItemForm");
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


    var getAllItem = function() {
        return localStorageServices.getLocalStorage(currentUser + "Items");
    }

    var setAllItem = function(itemList) {
        return localStorageServices.setLocalStorage(currentUser + "Items", itemList);
    }

    var hideforms = function() {
        document.getElementById("addItemForm").setAttribute("hidden", "hidden");
        document.getElementById("editItemForm").setAttribute("hidden", "hidden");
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
        if (getAllItem() === null) {
            allItemList = []
            allItemList.push(item)
            localStorageServices.setLocalStorage(currentUser + "Items", allItemList);
        } else {
            allItemList = getAllItem()
            allItemList.push(item)
            localStorageServices.setLocalStorage(currentUser + "Items", allItemList);
        }

        displayToDoItem(allItemList);
    }


    var displayToDoItem = function(itemList) {

        allItemList = itemList;
        var itemHtml = "";

        if (allItemList){
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
		            '<a  onclick="toDoServices.editModal(' + index + ')"><i class="fa fa-edit"></i></a>&nbsp; &nbsp; ' +
		            '<a  onclick="toDoServices.deleteItem(' + index + ')"><i class="fa fa-trash-o"></i></a>' +
		            '</div>' +
		            '</li>';
        	});
        }
        

        document.getElementById('toDoList').innerHTML = itemHtml;

    }


    displayToDoItem(getAllItem());

    var editModal = function(index) {

        clearAllCategories("editCategory");
        closeForm("addItemForm");

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

    var addItem = function() {

        closeForm("editItemForm");
        document.getElementById("addItemForm").removeAttribute("hidden");
        clearAllCategories("category");
    }


    var closeForm = function(formId) {
        document.getElementById(formId).setAttribute("hidden", "hidden");
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

    var clearAllCategories = function(category) {

        document.querySelectorAll('input[name="' + category + '"]')[0].checked = false;
        document.querySelectorAll('input[name="' + category + '"]')[1].checked = false;
        document.querySelectorAll('input[name="' + category + '"]')[2].checked = false;
        document.querySelectorAll('input[name="' + category + '"]')[3].checked = false;

    }
    var category = function(checkbox, category) {
        clearAllCategories(category);
        checkbox.checked = true;
    }

    var deleteItem = function(index) {
        allItemList.splice(index, 1);
        setAllItem(allItemList);
        displayToDoItem(allItemList);
    }

    var bulkDelete = function() {

        hideforms();
        var checkboxes = document.getElementsByName("items");
        var deleteIndexArray = [];

        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                deleteIndexArray.push(checkboxes[i].value);
            }
        }

        for (var i = deleteIndexArray.length - 1; i >= 0; i--) {
            allItemList.splice(deleteIndexArray[i], 1);
        }

        setAllItem(allItemList);
        displayToDoItem(allItemList)
    }


    var service = {};
    service.displayToDoItem = displayToDoItem;
    service.Reminder = Reminder;
    service.addItem = addItem;
    service.editModal = editModal;
    service.closeForm = closeForm;
    service.deleteItem = deleteItem;
    service.category = category;
    service.bulkDelete = bulkDelete;
    service.hideforms = hideforms;
    service.getAllItem = getAllItem;
    return service;

})();