// List of Seattle Traffic Cameras
// http://data.seattle.gov/resource/65fc-btcc.json

"use strict";

//put your code here to create the map, fetch the list of traffic cameras
//and add them as markers on the map
//when a user clicks on a marker, you should pan the map so that the marker
//is at the center, and open an InfoWindow that displays the latest camera
//image
//you should also write the code to filter the set of markers when the user
//types a search phrase into the search box

$(document).ready(function() {
	var mapOptions= {
		center: {lat: 47.6, lng: -122.3},
		zoom: 12
	}
	var mapElem = document.getElementById('map');
	var map = new google.maps.Map(mapElem, mapOptions);

	var infoWin = new google.maps.InfoWindow();

	var camera = $.getJSON('http://data.seattle.gov/resource/65fc-btcc.json')
		.done(function(data) {
		    //success
			console.log("success");
			
			 $.each(data, function(i, item) {
			 	var lat = parseFloat(item.location.latitude);
			 	var lng = parseFloat(item.location.longitude);
			 	var currPos = new google.maps.LatLng(lat, lng);
			 	var marker = new google.maps.Marker({
			 		position: currPos,
			 		map: map
			 	});
			 	google.maps.event.addListener(marker, 'click', function() {
			 		map.panTo(this.getPosition());
			 		var html = '<p>' + item.cameralabel + '</p>' + '<p><img src="' +item.imageurl.url+'"/></p>';
			 		infoWin.setContent(html);
					infoWin.open(map, this);
			 	});

			 	
			 	$("#search").bind("search keyup", function() {
			 		var input = $('#search').val().toLowerCase();
			 		var label = item.cameralabel.toLowerCase();
			 		if(label.indexOf(input) == -1) {
			 			marker.setMap(null);
			 			marker.setMap(map);
			 		}
			 	});
			 	
			 });	
		
		})
		.fail(function(data) {
		//error contains error info	
			alert("getJSON failed");	
		})
		.always(function() {
		//called on either success or error cases
		})

});



 