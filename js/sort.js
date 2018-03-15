var sortServices = (function() {

    var currentUser = commonServices.getCurrentUser();
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
        allItemList = commonServices.getAllItem(currentUser);
        allItemList.sort(GetSortOrder("dueDate"));
        commonServices.displayToDoItem(allItemList);
    }

    var ascSort = function() {
        allItemList = commonServices.getAllItem(currentUser);
        allItemList.sort(GetSortOrder("dueDate"));
        allItemList.reverse();
        commonServices.displayToDoItem(allItemList);
    }

    var service = {};
    service.descSort = descSort;
    service.ascSort = ascSort;
    return service;

})();