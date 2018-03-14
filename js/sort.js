var sortServices = (function() {

    var currentUser = localStorageServices.getLocalStorage("currentUser");
    var filteredItems = [];
    var allItemList;

    function GetSortOrder(prop) {
        return function(a, b) {
            if (new Date(a[prop]) > new Date(b[prop])) {
                return 1;
            } else if (new Date(a[prop]) < new Date(b[prop])) {
                return -1;
            }
            return 0;
        }
    }

    var descSort = function() {
        allItemList = localStorageServices.getLocalStorage(currentUser + "Items");
        allItemList.sort(GetSortOrder("dueDate"));
        toDoServices.displayToDoItem(allItemList);
    }

    var ascSort = function() {
        allItemList = localStorageServices.getLocalStorage(currentUser + "Items");
        allItemList.sort(GetSortOrder("dueDate"));
        allItemList.reverse();
        toDoServices.displayToDoItem(allItemList);
    }

    var service = {};
    service.descSort = descSort;
    service.ascSort = ascSort;
    return service;

})();