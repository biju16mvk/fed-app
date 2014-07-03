app.factory('ClientDataService', function(localStorageService, CommonService, LocalDataService) {
    this.getSyntheticData = function(callback) {
        callback(localStorageService.get("files"));
    }

    this.getSites = function(callback) {
        callback(LocalDataService.files["Site"]);
    }
    this.getSiteById = function(siteId, callback) {
        this.getSites(function(sites) {
            callback(CommonService.getItemFromArray(sites, {
                key: "SiteID",
                value: siteId
            }));
        });
    }
    this.getSitesByInstallationId = function(installationId, callback) {
        this.getSites(function(sites) {
            callback(CommonService.getItemsFromArray(sites, {
                key: "InstallationID",
                value: installationId
            }));
        });
    }

    this.getInstallations = function(callback) {
        callback(LocalDataService.files["Installation"]);
    }
    this.getInstallationById = function(installationId, callback) {
        this.getInstallations(function(installations) {
            callback(CommonService.getItemFromArray(installations, {
                key: "InstallationID",
                value: installationId
            }));
        });
    }

    this.getSiteOrganizations = function(callback) {
        callback(LocalDataService.files["Site_Organization"]);
    }
    this.getSiteOrganizationsById = function(siteId, callback) {
        this.getSiteOrganizations(function(siteOrganizations) {
            callback(CommonService.getItemsFromArray(siteOrganizations, {
                key: "SiteID",
                value: siteId
            }));
        });
    }

    this.getOrganizations = function(callback) {
        callback(LocalDataService.files["Organization"]);
    }
    this.getOrganizationById = function(organizationId, callback) {
        this.getOrganizations(function(organizations) {
            callback(CommonService.getItemFromArray(organizations, {
                key: "OrganizationID",
                value: organizationId
            }));
        });
    }

    this.getOrganizationsBySiteId = function(siteId, callback) {
        var self = this;
        this.getSiteOrganizationsById(siteId, function(siteOrganizations) {
            var organizations = [];
            $.each(siteOrganizations, function(i, siteOrganization) {
                self.getOrganizationById(siteOrganization.OrganizationID, function(organization) {
                    organizations.push(organization);
                });
            });
            callback(organizations);
        });
    }

    this.getFacilities = function(callback) {
        callback(LocalDataService.files["Facility"]);
    }
    this.getFacilityById = function(facilityId, callback) {
        this.getFacilities(function(facilities) {
            callback(CommonService.getItemFromArray(facilities, {
                key: "FacilityID",
                value: facilityId
            }));
        });
    }
    this.getFacilitiesBySiteId = function(siteId, callback) {
        this.getFacilities(function(facilities) {
            callback(CommonService.getItemsFromArray(facilities, {
                key: "SiteID",
                value: siteId
            }));
        });
    }
    this.getPicklistOperationalStatus = function(callback) {
        callback(LocalDataService.files["Picklist_OperationalStatus"]);
    }

    this.getAddresses = function(callback) {
        callback(LocalDataService.files["Address"]);
    }
    this.getAddressById = function(addressId, callback) {
        this.getAddresses(function(addresses) {
            callback(CommonService.getItemFromArray(addresses, {
                key: "AddressID",
                value: addressId
            }));
        });
    }

    this.getAgencies = function(callback) {
        callback(LocalDataService.files["Agency"]);
    }
    this.getAgencyById = function(agencyId, callback) {
        this.getAgencies(function(agencies) {
            callback(CommonService.getItemFromArray(agencies, {
                key: "AgencyID",
                value: agencyId
            }));
        });
    }

    this.getFloors = function(callback) {
        callback(LocalDataService.files["Floor"]);
    }
    this.getFloorById = function(floorId, callback) {
        this.getFloors(function(floors) {
            callback(CommonService.getItemFromArray(floors, {
                key: "FloorID",
                value: floorId
            }));
        });
    }
    this.getFloorsByFacilityId = function(facilityId, callback) {
        this.getFloors(function(floors) {
            callback(CommonService.getItemsFromArray(floors, {
                key: "FacilityID",
                value: facilityId
            }));
        });
    }

    this.getAttributes = function(callback) {
        callback(LocalDataService.files["Attribute"]);
    }
    this.getAttributesBySpaceId = function(spaceId, callback) {
        this.getAttributes(function(attributes) {
            callback(CommonService.getItemsFromArray(attributes, {
                key: "SubjectID",
                value: spaceId
            }));
        });
    }
    this.getAttributeByMultipleFilter = function(filterObj, callback) {
        this.getAttributes(function(attributes) {
            callback(CommonService.getItemFromArrayByMultipleFilter(attributes, filterObj));
        });
    }
    this.saveAttribute = function(attribute, callback) {
        this.getAttributes(function(attributes) {
            LocalDataService.files["Attribute"] = CommonService.setItemToArray(attributes, {
                key: "AttributeID",
                value: attribute.AttributeID,
                data: attribute
            });
        });
    }

    this.getSpaces = function(callback) {
        callback(localStorageService.get("files")["Space"]);
    }
    this.getSpaceById = function(spaceId, callback) {
        this.getSpaces(function(spaces) {
            callback(CommonService.getItemFromArray(spaces, {
                key: "SpaceID",
                value: spaceId
            }));
        });
    }
    this.getSpacesByFloorId = function(floorId, callback) {
        this.getSpaces(function(spaces) {
            callback(CommonService.getItemsFromArray(spaces, {
                key: "FloorID",
                value: floorId
            }));
        });
    }
    this.saveSpace = function(space) {
        this.getSpaces(function(spaces) {
            LocalDataService.files["Space"] = CommonService.setItemToArray(spaces, {
                key: "SpaceID",
                value: space.SpaceID,
                data: space
            });
        });
    }
    this.saveSpaceAndAttributeSpace = function(space, attributeSpaceCapacity, attributeSpaceOccupancy, callback) {
        if (space) {
            this.saveSpace(space);
        }
        if (attributeSpaceCapacity) {
            this.saveAttribute(attributeSpaceCapacity);
        }
        if (attributeSpaceOccupancy) {
            this.saveAttribute(attributeSpaceOccupancy);
        }
        if (space || attributeSpaceCapacity || attributeSpaceOccupancy) {
            callback(localStorageService.set("files", LocalDataService.files));
        }
    }

    this.getSpaceZones = function(callback) {
        callback(LocalDataService.files["Space_Zone"]);
    }
    this.getSpaceZoneById = function(spaceId, callback) {
        this.getSpaceZones(function(spaceZones) {
            callback(CommonService.getItemFromArray(spaceZones, {
                key: "SpaceID",
                value: spaceId
            }));
        });
    }

    this.getZones = function(callback) {
        callback(LocalDataService.files["Zone"]);
    }
    this.getZoneById = function(zoneId, callback) {
        this.getZones(function(zones) {
            callback(CommonService.getItemFromArray(zones, {
                key: "ZoneID",
                value: zoneId
            }));
        });
    }

    this.getServices = function(callback) {
        callback(LocalDataService.files["Service"]);
    }
    this.getServiceById = function(serviceId, callback) {
        this.getServices(function(services) {
            callback(CommonService.getItemFromArray(services, {
                key: "ServiceID",
                value: serviceId
            }));
        });
    }

    this.getColorCodedPlans = function(callback) {
        callback(LocalDataService.files["Space_ColorCoding"]);
    }
    this.getColorCodedPlansGroupBySpaceColorCoding = function(callback) {
        this.getColorCodedPlans(function(colorCodedPlans) {
            callback(CommonService.getGroupedItemsFromArray(colorCodedPlans, "spaceColorCoding"));
        });
    }
    this.getColorCodedPlansByName = function(keyName, value, callback) {
        this.getColorCodedPlans(function(colorCodedPlans) {
            callback(CommonService.getItemsFromArray(colorCodedPlans, {
                key: keyName,
                value: value
            }));
        });
    }

    return this;
});