// load google map

function initialize() {
    var mapOptions = {
      center: { lat: 38.898, lng: -77.037},
      zoom: 14
    };
    var map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);

    // get request to retrieve all pins
	$.ajax({
	  type: "GET",
	  dataType: 'json',
	  url: '/pins',
	  // data: response,
	  success: function (response) {
	    console.log("get request - success");
	    // see all pins that have been added to map
	    for (var i = 0; i < response.length; i++ ) {
		    var location = new google.maps.LatLng(response[i].latitude, response[i].longitude);
			var newMarker = new google.maps.Marker({
			  position: location,
			  map: map
			});
		  }
		},
	  error: function() {
	    console.log("get request - didn't work");
	    },
	});

	google.maps.event.addListener(map, 'click', function(event) {
	var latitude = event.latLng.lat().toFixed(3);
	var longitude = event.latLng.lng().toFixed(3);
	console.log(latitude, longitude);
    $.ajax({
      type: "POST",
      dataType: 'json',
      url: '/pins',
      data: { pin: { longitude: longitude, latitude: latitude } },
      success: function () {
        console.log("post request success");
        var location = new google.maps.LatLng(latitude, longitude);
		var newMarker = new google.maps.Marker({
		  position: location,
		  map: map
      	});
	  },
      error: function() {
        console.log("post didn't work");
      },
    });
});


}

google.maps.event.addDomListener(window, 'load', initialize);

// add a new pin by clicking on map
// post request to add a new pin to db when user clicks on map

// google.maps.event.addListener(map, 'click', function(event) {
// 	var latitude = event.latLng.lat().toFixed(3);
// 	var longitude = event.latLng.lng().toFixed(3);
// 	console.log(lat, lng);
//     $.ajax({
//       type: "POST",
//       dataType: 'json',
//       url: '/pins',
//       data: { pin: { longitude: longitude, latitude: latitude } },
//       success: function () {
//         console.log("post request success");
//         var location = new google.maps.LatLng(latitude, longitude);
// 		var newMarker = new google.maps.Marker({
// 		  position: location,
// 		  map: map
//       	});
// 	  },
//       error: function() {
//         console.log("post didn't work");
//       },
//     });
// });
