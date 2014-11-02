var map;
var infowindow;
var directionsService = new google.maps.DirectionsService();
var directionsDisplay = new google.maps.DirectionsRenderer();
var host = location.origin.replace(/^http/,'ws');
var socket = io.connect(host, {secure: true});
var order = 0;

function initialize() {
  var mapOptions = {
    zoom: 15,
  };

  var map = new google.maps.Map(document.getElementById('map-canvas'),
  mapOptions);

  //geolocation attempt via HTML5
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var coords = new google.maps.LatLng(position.coords.latitude,
        position.coords.longitude);
        var directionsService = new google.maps.DirectionsService();
        var directionsDisplay = new google.maps.DirectionsRenderer();
        var mapOptions = //Sets map options
        {
          zoom: 15,  //Sets zoom level (0-21)
          center: coords, //zoom in on users location
          mapTypeControl: true, //allows you to select map type eg. map or satellite
          navigationControlOptions:
          {
            style: google.maps.NavigationControlStyle.SMALL //sets map controls size eg. zoom
          },
          mapTypeId: google.maps.MapTypeId.ROADMAP //sets type of map Options:ROADMAP, SATELLITE, HYBRID, TERRIAN
        };

      //map = new google.maps.Map( /*creates Map variable*/ document.getElementById("map"), mapOptions /*Creates a new map using the passed optional parameters in the mapOptions parameter.*/);


	  directionsDisplay.setMap(map);
      directionsDisplay.setPanel(document.getElementById('panel'));
      var request = {
        origin: coords,
        destination: 'M1 5WW',
        travelMode: google.maps.DirectionsTravelMode.WALKING
      };

      directionsService.route(request, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(response);
          }
        });

      var request = {
        location: coords,
        radius: 500,
        types: ['bar']
      };

      infowindow = new google.maps.InfoWindow();
      var service = new google.maps.places.PlacesService(map);
      service.nearbySearch(request, callback);
  });
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  var image = {
    url: 'images/pint.png',
    // This marker is 20 pixels wide by 32 pixels tall.
    size: new google.maps.Size(32, 32),
    // The origin for this image is 0,0.
    origin: new google.maps.Point(0,0),
    // The anchor for this image is the base of the pint at 0,32.
    anchor: new google.maps.Point(0, 32)
  };
  var shape = {
      coords: [1, 1, 1, 32, 32, 32, 32 , 1],
      type: 'poly'
  };
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    icon: image,
    shape: shape,
    zIndex: 100
  });

google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);

	socket.emit('destination', {name : place.name, number : order, username : document.cookie});
	order++;

  });
}
  //setMarkers(map,pubs);

}

function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
    var content = 'Error: The Geolocation service failed.';
  } else {
    var content = 'Error: Your browser doesn\'t support geolocation.';
  }
  var options = {
    map: map,
    position: new google.maps.LatLng(53, -2),
    content: content
  };
  var infowindow = new google.maps.InfoWindow(options);
  map.setCenter(options.position);
  }

function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
    var content = 'Error: The Geolocation service failed.';
  } else {
    var content = 'Error: Your browser doesn\'t support geolocation.';
  }

  var options = {
    map: map,
    position: new google.maps.LatLng(53, -2),
    content: content
  };

  var infowindow = new google.maps.InfoWindow(options);
  map.setCenter(options.position);
}

google.maps.event.addDomListener(window, 'load', initialize);
