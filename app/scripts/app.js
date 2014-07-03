'use strict';

var app = angular.module('fedifmApp', ['ngRoute', 'ngMap', 'ngGrid', 'hljs', 'breeze.angular', 'LocalStorageModule'])
    .config(function($routeProvider, $sceDelegateProvider) {
        $sceDelegateProvider.resourceUrlWhitelist([
            // Allow same origin resource loads.
            'self',
            // Allow loading from our assets domain.  Notice the difference between * and **.
            'https://www.onuma.com/**'
        ]);
        $routeProvider
            .when('/map', {
                templateUrl: 'app/views/map.html',
                controller: 'MapCtrl',
                title: 'Map'
            })
            .when('/facilities/site-dashboard/:siteId', {
                templateUrl: 'app/views/site-dashboard.html',
                controller: 'SiteDashboardCtrl',
                title: 'Site Dashboard'
            })
            .when('/facilities/space-use/:facilityId', {
                templateUrl: 'app/views/space-use.html',
                controller: 'SpaceUseCtrl',
                title: 'Space Assessment (Condition & Use)'
            })
            .when('/admin/synthetic-data', {
                templateUrl: 'app/views/synthetic-data.html',
                controller: 'SyntheticDataCtrl',
                title: 'Synthetic Data'
            })
            .otherwise({
                redirectTo: '/map'
            });
    }).run(function($rootScope) {
        $rootScope.$on('$routeChangeStart', function() {
            NProgress.start();
        });
        $rootScope.$on('$viewContentLoaded', function() {
            NProgress.done();
        });
    });