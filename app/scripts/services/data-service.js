app.factory('DataService', function(PersistenceDataService, ClientDataService) {
    var defaultDataService = ClientDataService; //Default data service implementation layer

    this.getSyntheticData = function(callback) {
        ClientDataService.getSyntheticData(callback);
    }

    this.getSites = function(callback) {
        defaultDataService.getSites(callback);
    }
    this.getSiteById = function(siteId, callback) {
        defaultDataService.getSiteById(siteId, callback);
    }
    this.getSitesByInstallationId = function(installationId, callback) {
        defaultDataService.getSitesByInstallationId(installationId, callback);
    }

    this.getInstallations = function(callback) {
        defaultDataService.getInstallations(callback);
    }
    this.getInstallationById = function(installationId, callback) {
        defaultDataService.getInstallationById(installationId, callback);
    }

    this.getSiteOrganizations = function(callback) {
        ClientDataService.getSiteOrganizations(callback);
    }
    this.getSiteOrganizationsById = function(siteId, callback) {
        ClientDataService.getSiteOrganizationsById(siteId, callback);
    }

    this.getOrganizations = function(callback) {
        ClientDataService.getOrganizations(callback);
    }
    this.getOrganizationById = function(organizationId, callback) {
        ClientDataService.getOrganizationById(organizationId, callback);
    }

    this.getOrganizationsBySiteId = function(siteId, callback) {
        defaultDataService.getOrganizationsBySiteId(siteId, callback);
    }

    this.getFacilities = function(callback) {
        ClientDataService.getFacilities(callback);
    }
    this.getFacilityById = function(facilityId, callback) {
        defaultDataService.getFacilityById(facilityId, callback);
    }
    this.getFacilitiesBySiteId = function(siteId, callback) {
        defaultDataService.getFacilitiesBySiteId(siteId, callback);
    }
    this.getPicklistOperationalStatus = function(callback) {
        defaultDataService.getPicklistOperationalStatus(callback);
    }

    this.getAddresses = function(callback) {
        ClientDataService.getAddresses(callback);
    }
    this.getAddressById = function(addressId, callback) {
        defaultDataService.getAddressById(addressId, callback);
    }

    this.getAgencies = function(callback) {
        ClientDataService.getAgencies(callback);
    }
    this.getAgencyById = function(agencyId, callback) {
        ClientDataService.getAgencyById(agencyId, callback);
    }

    this.getFloors = function(callback) {
        ClientDataService.getFloors(callback);
    }
    this.getFloorById = function(floorId, callback) {
        ClientDataService.getFloorById(floorId, callback);
    }
    this.getFloorsByFacilityId = function(facilityId, callback) {
        defaultDataService.getFloorsByFacilityId(facilityId, callback);
    }

    this.getSpaces = function(callback) {
        ClientDataService.getSpaces(callback);
    }
    this.getSpaceById = function(spaceId, callback) {
        defaultDataService.getSpaceById(spaceId, callback);
    }
    this.getSpacesByFloorId = function(floorId, callback) {
        defaultDataService.getSpacesByFloorId(floorId, callback);
    }
    this.saveSpaceAndAttributeSpace = function(space, attributeSpaceCapacity, attributeSpaceOccupancy, callback) {
        ClientDataService.saveSpaceAndAttributeSpace(space, attributeSpaceCapacity, attributeSpaceOccupancy, callback);
    }

    this.getAttributes = function(callback) {
        ClientDataService.getAttributes(callback);
    }
    this.getAttributesBySpaceId = function(spaceId, callback) {
        ClientDataService.getAttributesBySpaceId(spaceId, callback);
    }
    this.getAttributeByMultipleFilter = function(filterObj, callback) {
        ClientDataService.getAttributeByMultipleFilter(filterObj, callback);
    }

    this.getSpaceZones = function(callback) {
        ClientDataService.getSpaceZones(callback);
    }
    this.getSpaceZoneById = function(spaceId, callback) {
        ClientDataService.getSpaceZoneById(spaceId, callback);
    }

    this.getZones = function(callback) {
        ClientDataService.getZones(callback);
    }
    this.getZoneById = function(zoneId, callback) {
        ClientDataService.getZoneById(zoneId, callback);
    }

    this.getServices = function(callback) {
        ClientDataService.getServices(callback);
    }
    this.getServiceById = function(serviceId, callback) {
        defaultDataService.getServiceById(serviceId, callback);
    }

    this.getColorCodedPlans = function(callback) {
        ClientDataService.getColorCodedPlans(callback);
    }
    this.getColorCodedPlansGroupBySpaceColorCoding = function(callback) {
        ClientDataService.getColorCodedPlansGroupBySpaceColorCoding(callback);
    }
    this.getColorCodedPlansByName = function(keyName, value, callback) {
        ClientDataService.getColorCodedPlansByName(keyName, value, callback);
    }

    return this;
});