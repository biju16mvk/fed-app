/*
 * charts/chart_filled_blue.js
 *
 * Demo JavaScript used on charts-page for "Filled Chart (Blue)".
 */

"use strict";
$(document).ready(function () {
setTimeout(function(){
	    var Activity = new ActivityApi('http://192.168.1.23/fluentxs-activity');
        var ActivityData = Activity.getAllActivityData();
        var RecentActivities = ActivityData.results;
        var jancount=0, febcount=0, marcount=0, apcount=0, maycount=0, junecount=0, julycount=0
        ,augcount=0, sepcount=0, octcount=0, novcount=0, deccount=0;
        for (var i=0 ; i<RecentActivities.length; i++) {
            var date_array = RecentActivities[i].created_at.split(' ');
            date_array = date_array[0].split('-');
            if(date_array[1] === '01') {
                jancount = jancount+1;
            }else if(date_array[1] === '02') {
                febcount = febcount+1;
            }else if(date_array[1] === '03') {
                marcount = marcount+1;
            }else if(date_array[1] === '04') {
                apcount = apcount+1;
            }else if(date_array[1] === '05') {
                maycount = maycount+1;
            }else if(date_array[1] === '06') {
                junecount = junecount+1;
            }else if(date_array[1] === '07') {
                julycount = julycount+1;
            }else if(date_array[1] === '08') {
                augcount = augcount+1;
            }else if(date_array[1] === '09') {
                sepcount = sepcount+1;
            }else if(date_array[1] === '10') {
                octcount = octcount+1;
            }else if(date_array[1] === '11') {
                novcount = novcount+1;
            }else if(date_array[1] === '12') {
                deccount = deccount+1;
            }
         }
	// Sample Data
	var d1 = [
			  [1262304000000, jancount], 
			  [1264982400000, febcount], 
			  [1267401600000, marcount], 
			  [1270080000000, apcount], 
			  [1272672000000, maycount], 
			  [1275350400000, junecount], 
			  [1277942400000, julycount], 
			  [1280620800000, augcount], 
			  [1283299200000, sepcount], 
			  [1285891200000, octcount], 
			  [1288569600000, novcount], 
			  [1291161600000, deccount]
			 ];

	var data1 = [
		{ label: "Total activities", data: d1, color: App.getLayoutColorCode('blue') }
	];

	$.plot("#chart_filled_blue", data1, $.extend(true, {}, Plugins.getFlotDefaults(), {
		xaxis: {
			min: (new Date(2009, 12, 1)).getTime(),
			max: (new Date(2010, 11, 2)).getTime(),
			mode: "time",
			tickSize: [1, "month"],
			monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
			tickLength: 0
		},
		series: {
			lines: {
				fill: true,
				lineWidth: 1.5
			},
			points: {
				show: true,
				radius: 2.5,
				lineWidth: 1.1
			},
			grow: { active: true, growings:[ { stepMode: "maximum" } ] }
		},
		grid: {
			hoverable: true,
			clickable: true
		},
		tooltip: true,
		tooltipOpts: {
			content: '%s: %y'
		}
	}));


},500);
});