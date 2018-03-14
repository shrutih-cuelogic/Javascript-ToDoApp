var searchServices = (function() {

    var currentUser = localStorageServices.getLocalStorage("currentUser"),
        filteredItems = [],
        allItemList = localStorageServices.getLocalStorage(currentUser + "Items");;

    var searchOnDueDate = function() {

        toDoServices.hideforms();
        var fromDate = new Date(document.getElementById("range1").value),
            toDate = new Date(document.getElementById("range2").value);
        filteredItems = [];

        if (!document.getElementById("range1").value | !document.getElementById("range2").value) {

            alert("please give date range");
            return false;

        } else if (fromDate > toDate) {

            alert("From date must be less than to_date")
            return false;

        }

        allItemList.forEach(function(item, index) {
            var dueDate = new Date(item["dueDate"]);
            if (dueDate >= fromDate && dueDate <= toDate) {
                filteredItems.push(item);
            }
        });

        displaySearchResult(filteredItems);

    }

    var searchOnCategory = function() {

        toDoServices.hideforms();
        var food = document.querySelectorAll('input[name="searchCategory"]')[0].checked;
        var health = document.querySelectorAll('input[name="searchCategory"]')[1].checked;
        var study = document.querySelectorAll('input[name="searchCategory"]')[2].checked;
        var other = document.querySelectorAll('input[name="searchCategory"]')[3].checked;
        var selectedCategory = [];
        filteredItems = [];

        if (food) {
            selectedCategory.push(document.querySelectorAll('input[name="searchCategory"]')[0].value);
        }
        if (health) {
            selectedCategory.push(document.querySelectorAll('input[name="searchCategory"]')[1].value);
        }
        if (study) {
            selectedCategory.push(document.querySelectorAll('input[name="searchCategory"]')[2].value);
        }
        if (other) {
            selectedCategory.push(document.querySelectorAll('input[name="searchCategory"]')[3].value);
        }
        if (selectedCategory.length == 0) {
            alert("Please select the category");
            return false;
        }

        allItemList.forEach(function(item, index) {
            if (selectedCategory.indexOf(item["category"]) != -1) {
                filteredItems.push(item);
            }
        });

        displaySearchResult(filteredItems);

    }

    var searchOnIsDone = function() {

        toDoServices.hideforms();
        var isDone = document.getElementById("searchIsDone").checked;
        filteredItems = [];

        allItemList.forEach(function(item, index) {
            if (item["isDone"] == isDone) {
                filteredItems.push(item);
            }
        });

        displaySearchResult(filteredItems);
    }

    var searchOnIsPending = function() {

        toDoServices.hideforms();
        var isPending = document.getElementById("searchIsPending").checked;

        if (!isPending) {
            alert("Please select Is pending checkbox");
            return false;
        }
        var today = new Date();
        filteredItems = [];

        allItemList.forEach(function(item, index) {
            var dueDate = new Date(item["dueDate"]);
            if (dueDate > today) {
                filteredItems.push(item);
            }
        });

        displaySearchResult(filteredItems);
    }

    var displaySearchResult = function(filteredItems) {
        document.getElementById('toDoList').innerHTML = "<h3> Result Not Found</h3>";
        if (filteredItems.length != 0) {
            toDoServices.displayToDoItem(filteredItems);
        }
    }

    var service = {};
    service.searchOnDueDate = searchOnDueDate;
    service.searchOnCategory = searchOnCategory;
    service.searchOnIsDone = searchOnIsDone;
    service.searchOnIsPending = searchOnIsPending;
    return service;

})();