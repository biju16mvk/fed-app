/*global angular, sessionStorage, jQuery, API_BASE*/
(function() {
    "use strict";
    /** Directive for checking Password Match in User Registration Page**/
    var app = angular.module('fedifmApp');

    app.directive('leftSidebar', function() {
        return {
            restrict: 'E',
            scope: false,
            replace: true,
            templateUrl: 'app/views/left-sidebar.html',
        };
    });

    app.directive('fusionChart', function($timeout) {
        return {
            restrict: 'E',
            controller: 'FusionChartCtrl',
            link: function(scope, element, attrs) {
                var myChart = new FusionCharts(attrs.type, "myChartId", attrs.width, attrs.height);
                scope.$on('facilitiesLoaded', function() {
                    myChart.setJSONData(scope.fusionChart);
                    myChart.render(attrs.id);
                });
            }
        };
    });

    app.directive('barChart', function($timeout) {
        return {
            restrict: 'E',
            controller: 'BarChartController',
            template: '<div class="chart"></div>',
            replace: true,
            link: function(scope, element, attrs) {
                // Initialize Chart
                scope.$on('facilitiesLoaded', function() {
                    $.plot("#" + attrs.id, scope.barGraph, $.extend(true, {}, Plugins.getFlotDefaults(), {
                        series: {
                            lines: {
                                show: false
                            },
                            points: {
                                show: false
                            }
                        },
                        grid: {
                            hoverable: true
                        },
                        tooltip: true,
                        tooltipOpts: {
                            content: '%s: %y'
                        }
                    }));
                });
            }
        };
    });

    /* global ngMap */
    /* global google */
    app.directive('infoWindow', ['Attr2Options',
        function(Attr2Options) {
            //var parser = new Attr2Options();
            return {
                restrict: 'E',
                require: '^map',
                link: function(scope, element, attrs, mapController) {
                    var filtered = new Attr2Options.filter(attrs);

                    /*
                     * set infoWindow options
                     */
                    scope.google = google;
                    var options = Attr2Options.getOptions(filtered, scope);
                    if (options.pixelOffset) {
                        options.pixelOffset = google.maps.Size.apply(this, options.pixelOffset);
                    }
                    var infoWindow = new google.maps.InfoWindow(options);
                    infoWindow.contents = element.html();

                    /*
                     * set infoWindow events
                     */
                    var events = Attr2Options.getEvents(scope, filtered);
                    for (var eventName in events) {
                        if (eventName) {
                            google.maps.event.addListener(infoWindow, eventName, events[eventName]);
                        }
                    }

                    // set infoWindows to map controller
                    mapController.infoWindows.push(infoWindow);

                    // do NOT show this
                    element.css({
                        display: 'none'
                    });

                    //provide showInfoWindow function to controller
                    scope.showInfoWindow = function(event, id, options) {
                        var infoWindow = scope.infoWindows[id];
                        var contents = infoWindow.contents;
                        var matches = contents.match(/\[\[[^\]]+\]\]/g);
                        if (matches) {
                            for (var i = 0, length = matches.length; i < length; i++) {
                                var expression = matches[i].replace(/\[\[/, '').replace(/\]\]/, '');
                                try {
                                    contents = contents.replace(matches[i], eval(expression));
                                } catch (e) {
                                    expression = "options." + expression;
                                    contents = contents.replace(matches[i], eval(expression));
                                }
                            }
                        }
                        infoWindow.setContent(contents);
                        infoWindow.open(scope.map, this);
                    }
                } //link
            }; // return
        } // function
    ]);

}());