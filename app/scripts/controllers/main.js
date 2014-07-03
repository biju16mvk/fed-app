'use strict';

app.controller('LeftSidebarCtrl', function($rootScope, $route, $timeout) {
    $rootScope.pageTitle = $route.current.title;

    $timeout(function() {
        App.init();
        Plugins.init();
    }, 100);

    $rootScope.navigationMenu = {
        items: [{
            name: "FED IFM",
            path: "fedifm",
            iconType: "icon-large icon-home"
        }, {
            name: "Map",
            path: "map",
            iconType: "icon-large icon-map-marker"
        }, {
            name: "Dashboard",
            path: "dashboard",
            iconType: "icon-large icon-dashboard"
        }, {
            name: "Facilities",
            iconType: "icon-large icon-plus-sign",
            subMenu: {
                items: [{
                    name: "Site Dashboard",
                    iconType: "list-alt",
                    path: ""
                }, {
                    name: "Facility Data",
                    iconType: "tasks",
                    path: ""
                }, {
                    name: "Space Use",
                    iconType: "tasks",
                    path: ""
                }, {
                    name: "RPIE/Components",
                    iconType: "tasks",
                    path: ""
                }, {
                    name: "Projects & Events",
                    iconType: "tasks",
                    path: ""
                }, {
                    name: "Maintenance",
                    iconType: "tasks",
                    path: ""
                }]
            }
        }, {
            name: "Administration",
            iconType: "sitemap",
            subMenu: {
                items: [{
                    name: "Synthetic Data",
                    iconType: "list-alt",
                    path: "admin/synthetic-data"
                }, {
                    name: "Facility Data",
                    iconType: "tasks",
                    path: ""
                }, {
                    name: "Installation",
                    iconType: "tasks",
                    path: ""
                }, {
                    name: "Site",
                    iconType: "tasks",
                    path: ""
                }, {
                    name: "Facility",
                    iconType: "tasks",
                    path: ""
                }, {
                    name: "Zone",
                    iconType: "tasks",
                    path: ""
                }, {
                    name: "Floor",
                    iconType: "tasks",
                    path: ""
                }, {
                    name: "System",
                    iconType: "tasks",
                    path: ""
                }, {
                    name: "Space",
                    iconType: "tasks",
                    path: ""
                }, {
                    name: "Component",
                    iconType: "tasks",
                    path: ""
                }]
            }
        }]
    };
});

app.controller('MapCtrl', function($rootScope, $scope, DataService) {
    $rootScope.currentTab = "Map";
    $scope.currentTabIcon = "icon-home";
    $scope.pageHeading = "Map";
    $scope.currentTabHref = "#/map";

    DataService.getSites(function(sites) {
        $scope.sites = sites;
    });
});

app.controller('SiteDashboardCtrl', function($rootScope, $scope, $routeParams, $location, $timeout, DataService, CommonService) {
    $rootScope.currentTab = "Facilities";
    $scope.currentTabIcon = "icon-home";
    $rootScope.currentSubTab = "Site Dashboard";
    $scope.currentSubTabHref = "#/facilities/site-dashboard/";
    $scope.pageHeading = "Site Dashboard";
    $scope.currentTabHref = "";

    var siteId = $routeParams.siteId || 1;
    $scope.selectedSiteId = siteId;
    $scope.siteMapViewUrl = "https://www.onuma.com/plan/OPS/viewSiteMap.php?sysID=57&ID=" + $scope.selectedSiteId + "&u=dummy&p=dummy&w=100%&h=490";

    $scope.loadSite = function() {
        $location.path("/facilities/site-dashboard/" + $scope.selectedSiteId);
    }

    $scope.loadSites = function() {
        DataService.getSitesByInstallationId($scope.selectedInstallationId, function(sites) {
            $scope.sites = sites;
        });
    }

    DataService.getSiteById(siteId, function(site) {
        $scope.site = site;

        var installationId = $scope.site.InstallationID || 1;
        $scope.selectedInstallationId = installationId;
        DataService.getInstallationById(installationId, function(installation) {
            $scope.installation = installation;

            var serviceId = $scope.installation.ServiceCode;
            DataService.getServiceById(serviceId, function(service) {
                $scope.service = service;
            });
        });

        var addressId = $scope.site.AddressID;
        DataService.getAddressById(addressId, function(address) {
            $scope.address = address;
        });

        $scope.loadSites();
    });

    DataService.getInstallations(function(installations) {
        $scope.installations = installations;
    });

    DataService.getOrganizationsBySiteId(siteId, function(organizations) {
        $scope.organizations = organizations;
    });

    DataService.getFacilitiesBySiteId(siteId, function(facilities) {
        $scope.facilities = facilities;
        $timeout(function() {
            $scope.$broadcast('facilitiesLoaded');
        });

    });

    DataService.getPicklistOperationalStatus(function(picklistOperationalStatus) {
        $scope.picklistOperationalStatus = picklistOperationalStatus;
    });

    //Organization Grid
    $scope.organizationDataHeader = [{
        field: 'Name',
        displayName: 'Name'
    }, {
        field: 'PhoneNumber',
        displayName: 'Phone'
    }, {
        field: 'OrganizationType',
        displayName: 'Type'
    }];
    $scope.organizationDataGridOptions = {
        data: 'organizations',
        enableColumnResize: false,
        multiSelect: false,
        showFilter: false,
        columnDefs: 'organizationDataHeader'
    };

    $scope.getOperationalStatus = function(operationalStatusId) {
        var PicklistOperationalStatus = CommonService.getItemFromArray($scope.picklistOperationalStatus, {
            key: "Picklist_OperationalStatusID",
            value: operationalStatusId
        });

        return PicklistOperationalStatus.Value;
    }

    //Facility Grid
    $scope.facilityDataHeader = [{
        field: 'Name',
        displayName: 'Facility Name',
        cellTemplate: '<div class="ngCellText"><a href="#/facilities/space-use/{{row.entity.FacilityID}}">{{row.getProperty(col.field)}}</a></div>'
    }, {
        field: 'Type',
        displayName: 'Facility Type'
    }, {
        field: 'FacilityConditionIndex',
        displayName: 'FCI'
    }, {
        field: 'GrossArea',
        displayName: 'GSF'
    }, {
        field: 'OperationalStatus',
        displayName: 'Status',
        cellTemplate: '<div class="ngCellText">{{getOperationalStatus(row.getProperty(col.field))}}</div>'
    }];
    $scope.facilityDataGridOptions = {
        data: 'facilities',
        enableColumnResize: false,
        multiSelect: false,
        showFilter: false,
        columnDefs: 'facilityDataHeader'
    };

    //Temp- to keep the history of navigation for left menu.
    $timeout(function() {
        $rootScope.navigationMenu.items[3].subMenu.items[0].path = "facilities/site-dashboard/" + siteId;
    });
});

app.controller('SpaceUseCtrl', function($rootScope, $scope, $routeParams, $timeout, DataService, CommonService) {
    $rootScope.currentTab = "Facilities";
    $scope.currentTabIcon = "icon-home";
    $rootScope.currentSubTab = "Space Use";
    $scope.currentSubTabHref = "#/facilities/space-use/";
    $scope.pageHeading = "Space Assessment (Condition & Use)";
    var mapBaseUrl = "https://www.onuma.com/plan/";

    var facilityId = $routeParams.facilityId || 1;
    DataService.getFacilityById(facilityId, function(facility) {
        $scope.facility = facility;
        var siteId = $scope.facility.SiteID;
        DataService.getSiteById(siteId, function(site) {
            $scope.site = site;
        });
    });

    $scope.loadAttributeSpace = function(selectedSpaceId) {
        DataService.getAttributeByMultipleFilter({
            SubjectID: selectedSpaceId,
            SubjectTable: "Space",
            Name: "Capacity"
        }, function(attributeSpaceCapacity) {
            $scope.attributeSpaceCapacity = attributeSpaceCapacity;
        });

        DataService.getAttributeByMultipleFilter({
            SubjectID: selectedSpaceId,
            SubjectTable: "Space",
            Name: "Occupancy"
        }, function(attributeSpaceOccupancy) {
            $scope.attributeSpaceOccupancy = attributeSpaceOccupancy;
        });

        DataService.getAttributeByMultipleFilter({
            SubjectID: selectedSpaceId,
            SubjectTable: "Space",
            Name: "Floor Finish"
        }, function(attributeSpaceFloorFinish) {
            $scope.attributeSpaceFloorFinish = attributeSpaceFloorFinish;
        });
    }

    $scope.loadColorCodedPlan = function(selectedSpaceColorCoding) {
        DataService.getColorCodedPlansByName("spaceColorCoding", selectedSpaceColorCoding, function(colorCodedLegends) {
            $scope.colorCodedLegends = colorCodedLegends;
        });
        $scope.colorCodedMapUrl = mapBaseUrl + "OPS/viewPlan.php?sysID=57&floorID=" + $scope.floor.FloorID + "&u=dummy&p=dummy&w=650&h=580&spaceColorCoding=" + selectedSpaceColorCoding;
    }

    $scope.loadColorCodedPlans = function() {
        DataService.getColorCodedPlansGroupBySpaceColorCoding(function(colorCodedPlans) {
            $scope.colorCodedPlans = colorCodedPlans;

            if ($scope.colorCodedPlans.length) {
                $scope.colorCodedPlan = $scope.colorCodedPlans[0];
                $timeout(function() {
                    $scope.colorCodedPlanDataGridOptions.selectRow(0, true);
                }, 100);

                DataService.getColorCodedPlansByName("spaceColorCoding", $scope.colorCodedPlan.spaceColorCoding, function(colorCodedLegends) {
                    $scope.colorCodedLegends = colorCodedLegends;
                });

                $scope.colorCodedMapUrl = mapBaseUrl + "OPS/viewPlan.php?sysID=57&floorID=" + $scope.floor.FloorID + "&u=dummy&p=dummy&w=632&h=580&spaceColorCoding=" + $scope.colorCodedPlan.spaceColorCoding;
            } else {
                $scope.colorCodedPlans = [];
            }
        });
    }

    $scope.loadSpace = function(selectedSpaceId) {
        DataService.getSpaceById(selectedSpaceId, function(space) {
            $scope.space = space;
        });
        $scope.floorMapUrl = mapBaseUrl + "OPS-beta/viewFloorSVG2.php?sysID=57&bldgID=" + facilityId + "&ID=" + $scope.floor.FloorID + "&selectedSpace=" + selectedSpaceId + "&u=dummy&p=dummy&width=430&height=430";
        $scope.loadAttributeSpace(selectedSpaceId);
    }

    $scope.loadSpaces = function(selectedFloorId) {
        DataService.getSpacesByFloorId(selectedFloorId, function(spaces) {
            $scope.spaces = spaces;

            if ($scope.spaces.length) {
                $scope.space = $scope.spaces[0];
                $timeout(function() {
                    $scope.floorSpaceDataGridOptions.selectRow(0, true);
                }, 100);
                $scope.floorMapUrl = mapBaseUrl + "OPS-beta/viewFloorSVG2.php?sysID=57&bldgID=" + facilityId + "&ID=" + selectedFloorId + "&selectedSpace=" + $scope.space.SpaceID + "&u=dummy&p=dummy&width=430&height=430";
                $scope.loadAttributeSpace($scope.space.SpaceID);
            } else {
                $scope.space = {};
                $scope.attributeSpaceCapacity = {};
                $scope.attributeSpaceOccupancy = {};
                $scope.attributeSpaceFloorFinish = {};
                $scope.colorCodedPlans = [];
                $scope.floorMapUrl = mapBaseUrl + "OPS-beta/viewFloorSVG2.php?sysID=57&bldgID=" + facilityId + "&ID=" + selectedFloorId + "&hideSpaceKey=0&u=dummy&p=dummy&width=430&height=430";
            }
        });
    }

    $scope.loadFloor = function(selectedFloorId) {
        DataService.getFloorById(selectedFloorId, function(floor) {
            $scope.floor = floor;
        });
    }

    $scope.loadFloors = function() {
        DataService.getFloorsByFacilityId(facilityId, function(floors) {
            $scope.floors = floors
            if ($scope.floors.length) {
                var floorArrayIndex = 0;
                var selectedfloorGridIndex = 0;
                if (facilityId == 226 || facilityId == 156) { //TEMP
                    floorArrayIndex = 1; //Temporarily set the default selected as 3rd item which is the first floor
                    selectedfloorGridIndex = 2; //Temporarily set the default selected as 3rd item which is the first floor
                }

                $scope.floor = $scope.floors[floorArrayIndex];
                $timeout(function() {
                    $scope.floorDataGridOptions.selectRow(selectedfloorGridIndex, true);
                }, 100);

                $scope.loadSpaces($scope.floor.FloorID);
            } else {
                $scope.floor = {};
            }

            $scope.loadColorCodedPlans();
        });
    }

    $scope.updateSpaceData = function() {
        DataService.saveSpaceAndAttributeSpace($scope.space, $scope.attributeSpaceCapacity, $scope.attributeSpaceOccupancy, function() {
            CommonService.flashNotify("Updated Space successfully");
        });
    }

    //Floor Grid
    var floorDataSortOptions = {
        fields: ["Number"],
        directions: ['asc']
    };
    $scope.floorDataHeader = [{
        field: '',
        displayName: '#',
        cellTemplate: '<div class="ngCellText">{{row.rowIndex+1}}</div>',
        headerClass: 'grid-header',
        width: "15%"
    }, {
        field: 'Number',
        displayName: '',
        cellTemplate: '',
        headerClass: '',
        width: "0%"
    }, {
        field: 'Name',
        displayName: 'Floor',
        cellTemplate: '<div class="ngCellText" ng-click="loadFloor(row.entity.FloorID);loadSpaces(row.entity.FloorID)">{{row.getProperty(col.field)}}</div>',
        headerClass: 'grid-header',
        width: "80%"
    }];
    $scope.floorDataGridOptions = {
        data: 'floors',
        enableColumnResize: false,
        enableSorting: false,
        multiSelect: false,
        showFilter: false,
        sortInfo: floorDataSortOptions,
        columnDefs: 'floorDataHeader'
    };

    //Floor Space Grid
    $scope.floorSpaceDataHeader = [{
        field: 'OrganizationRoomNumber',
        displayName: 'Space #',
        headerClass: 'grid-header',
        width: "25%"
    }, {
        field: 'Name',
        displayName: 'Name',
        cellTemplate: '<div class="ngCellText" ng-click="loadSpace(row.entity.SpaceID)">{{row.getProperty(col.field)}}</div>',
        headerClass: 'grid-header',
        width: "70%"
    }];
    $scope.floorSpaceDataGridOptions = {
        data: 'spaces',
        enableColumnResize: false,
        multiSelect: false,
        showFilter: false,
        columnDefs: 'floorSpaceDataHeader'
    };

    //Color Coded Plan
    $scope.colorCodedPlanDataHeader = [{
        field: '',
        displayName: '#',
        cellTemplate: '<div class="ngCellText">{{row.rowIndex+1}}</div>',
        headerClass: 'grid-header',
        width: "15%"
    }, {
        field: 'PicklistCategory',
        displayName: 'Color Coded Plan',
        cellTemplate: '<div class="ngCellText" ng-click="loadColorCodedPlan(row.entity.spaceColorCoding)">{{row.getProperty(col.field)}}</div>',
        headerClass: 'grid-header',
        width: "80%"
    }];
    $scope.colorCodedPlanDataGridOptions = {
        data: 'colorCodedPlans',
        enableColumnResize: false,
        multiSelect: false,
        showFilter: false,
        columnDefs: 'colorCodedPlanDataHeader'
    };

    //Color Coded Legend
    $scope.colorCodedLegendDataHeader = [{
        field: 'Value',
        displayName: 'Legend',
        headerClass: 'grid-header',
        width: "65%"
    }, {
        field: 'Color',
        displayName: 'Color',
        cellTemplate: '<div class="ngCellText"><span style="width:30px;background-color:{{row.getProperty(col.field)}}">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></div>',
        headerClass: 'grid-header hidden-font',
        width: "25%"
    }];
    $scope.colorCodedLegendDataGridOptions = {
        data: 'colorCodedLegends',
        enableRowSelection: false,
        columnDefs: 'colorCodedLegendDataHeader'
    };

    $scope.loadFloors();

    //Temp- to keep the history of navigation for left menu.
    $timeout(function() {
        $rootScope.navigationMenu.items[3].subMenu.items[2].path = "facilities/space-use/" + facilityId;
    });
});

app.controller('SyntheticDataCtrl', function($rootScope, $scope, DataService) {
    $rootScope.currentTab = "Administration";
    $scope.currentTabIcon = "icon-home";
    $rootScope.currentSubTab = "Synthetic Data";
    $scope.currentSubTabHref = "#/admin/synthetic-data";
    $scope.pageHeading = "Synthetic Data";
    $scope.currentTabHref = "";

    $scope.loadSyntheticData = function() {
        $scope.fedIfmData = vkbeautify.json($scope.files[$scope.fileName])
    };

    DataService.getSyntheticData(function(files) {
        $scope.files = files
        $scope.fileName = Object.keys($scope.files)[0];

        $scope.loadSyntheticData();
    });
});

app.controller('FusionChartCtrl', function($scope, DataService, CommonService) {
    var grossNetAreaOfZone = 0,
        grossNetArea = 0,
        grossNetAreaOfSpace = 0,
        previousZoneID = -1,
        space,
        spaceZone,
        zone,
        preZone,
        myChart,
        fusionChart = {
            data: []
        };

    fusionChart["chart"] = {
        caption: "Space Occupancy",
        xAxisName: "Space",
        yAxisName: "",
        numberPrefix: ""
    };

    $scope.$on('facilitiesLoaded', function() {
        angular.forEach($scope.facilities, function(facility) {
            DataService.getFloorsByFacilityId(facility.FacilityID, function(floors) {
                angular.forEach(floors, function(floor) {
                    DataService.getSpacesByFloorId(floor.FloorID, function(spaces) {
                        angular.forEach(spaces, function(space) {
                            grossNetAreaOfSpace += parseFloat(space.NetArea);

                            DataService.getSpaceZoneById(space.SpaceID, function(spaceZone) {
                                if (spaceZone) {
                                    if (spaceZone.ZoneID == previousZoneID || previousZoneID == -1) {
                                        grossNetAreaOfZone += parseFloat(space.NetArea);
                                    } else {
                                        DataService.getZoneById(previousZoneID, function(zone) {
                                            preZone = CommonService.getItemFromArray(fusionChart.data, {
                                                key: "label",
                                                value: zone.Name
                                            });
                                            if (preZone) {
                                                preZone.value += grossNetAreaOfZone;
                                                CommonService.setItemToArray(fusionChart.data, {
                                                    key: "label",
                                                    value: zone.Name,
                                                    data: preZone
                                                });
                                            } else {
                                                fusionChart.data.push({
                                                    label: zone.Name,
                                                    value: grossNetAreaOfZone
                                                });
                                            }
                                            grossNetArea += grossNetAreaOfZone;
                                            grossNetAreaOfZone = parseFloat(space.NetArea);
                                        });
                                    }
                                    previousZoneID = spaceZone.ZoneID;
                                }
                            });
                        });
                    });
                });
            });
        });
        fusionChart.data.push({
            label: "Free Space",
            value: grossNetAreaOfSpace - grossNetArea
        });

        $scope.fusionChart = fusionChart;
    });
});

app.controller('BarChartController', function($scope, DataService) {
    var bar1 = [],
        bar2 = [],
        barGraph = [];

    $scope.$on('facilitiesLoaded', function() {
        angular.forEach($scope.facilities, function(facility, index) {
            bar1.push([index, parseFloat(facility.FacilityConditionIndex)]);
            bar2.push([index, parseFloat(facility.PlantReplacmentValue) / parseFloat(facility.GrossArea)]);
        });

        barGraph.push({
            label: "FCI",
            data: bar1,
            bars: {
                show: true,
                barWidth: 0.2,
                order: 1
            }
        });
        barGraph.push({
            label: "PRV / GA",
            data: bar2,
            bars: {
                show: true,
                barWidth: 0.2,
                order: 2
            }
        });

        $scope.barGraph = barGraph;
    });
});