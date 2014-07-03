app.factory('CommonService', function($http) {
    this.getItemsFromArray = function(arrayItems, filterObj) {
        return $.map(arrayItems, function(item, i) {
            if (item[filterObj.key] == filterObj.value) {
                return item;
            }
        });
    };

    this.getItemFromArray = function(arrayItems, filterObj) {
        var matchedItem;
        $.each(arrayItems, function(i, item) {
            if (item[filterObj.key] == filterObj.value) {
                matchedItem = item;
                return false;
            }
        });
        return matchedItem;
    };

    this.setItemToArray = function(arrayItems, filterObj) {
        return $.map(arrayItems, function(item, i) {
            if (item[filterObj.key] == filterObj.value) {
                item = filterObj.data;
            }
            return item;
        });
    };

    this.getItemsFromArrayByMultipleFilter = function(arrayItems, filterObj) {
        var objFilter = true;
        return $.map(arrayItems, function(item, i) {
            $.each(filterObj, function(key, value) {
                if (item[key] != value) {
                    objFilter = false;
                }
            });
            if (objFilter) {
                return item;
            } else {
                objFilter = true;
            }
        });
    };

    this.getItemFromArrayByMultipleFilter = function(arrayItems, filterObj) {
        var objFilter = true;
        var matchedItem;
        $.each(arrayItems, function(i, item) {
            $.each(filterObj, function(key, value) {
                if (item[key] != value) {
                    objFilter = false;
                }
            });
            if (objFilter) {
                matchedItem = item;
                return false;
            } else {
                objFilter = true;
            }
        });
        return matchedItem;
    };

    this.getGroupedItemsFromArray = function(arrayItems, groupBy) {
        var preGroupByValue = "";
        return $.map(arrayItems, function(item, i) {
            if (item[groupBy] != preGroupByValue) {
                preGroupByValue = item[groupBy];
                return item;
            } else {
                preGroupByValue = item[groupBy];
            }
        });
    };

    this.flashNotify = function(message, type, layout) {
        noty({
            text: message,
            type: type ? type : "success",
            layout: layout ? layout : "top",
            timeout: 2000,
            dismissQueue: true,
            maxVisible: 1,
            killer: true
        });
    };

    /**
     * To send http request
     * @param object config
     * @param funciton callback
     */
    this.httpRequest = function(config, callback) {
        var resopnseCode = {
            OK: 200
        };
        var SUCCESS = 0;
        var FAILURE = 1;
        var config = {
            method: config.method ? config.method : 'GET',
            data: config.data ? config.data : {},
            url: config.url
        };

        $http(config).success(function(data, status, headers, config) {
            if (status == resopnseCode.OK) {
                if (data.status == SUCCESS) {
                    var results;
                    if (data.results.items && data.results.items.length) {
                        results = $.map(data.results.items, function(item) {
                            return item.source;
                        });
                    } else {
                        results = data.results;
                    }
                    callback(results);
                }
            }
        }).error(function(data, status, headers, config) {});
    };

    return this;
});