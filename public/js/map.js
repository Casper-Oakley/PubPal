var map;
var infowindow;
var directionsService = new google.maps.DirectionsService();
var directionsDisplay = new google.maps.DirectionsRenderer();

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
        destination: 'M15 6AA',
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
        types: ['store']
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
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}
  setMarkers(map,pubs);

}

var pubs = [
    ['Ancaster Halls', 53.476214, -2.245571, 4],
    ['Nightingale Halls', 53.476214, -2.245571, 5],
    ['Cavendish Halls', 53.474362, -2.241751, 3],
    ['Florence Boot', 53.474362, -2.241751, 2],
    ['Mooch', 53.473417, -2.251021, 1]
  ];

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

function setMarkers(map, locations) {
  // Add markers to the map

  // Marker sizes are expressed as a Size of X,Y
  // where the origin of the image (0,0) is located
  // in the top left of the image.

  // Origins, anchor positions and coordinates of the marker
  // increase in the X direction to the right and in
  // the Y direction down.


  var image = {
    url: 'images/pint.png',
    // This marker is 20 pixels wide by 32 pixels tall.
    size: new google.maps.Size(32, 32),
    // The origin for this image is 0,0.
    origin: new google.maps.Point(0,0),
    // The anchor for this image is the base of the pint at 0,32.
    anchor: new google.maps.Point(0, 32)
  };

  // Shapes define the clickable region of the icon.
  // The type defines an HTML &lt;area&gt; element 'poly' which
  // traces out a polygon as a series of X,Y points. The final
  // coordinate closes the poly by connecting to the first
  // coordinate.

  var shape = {
      coords: [1, 1, 1, 32, 32, 32, 32 , 1],
      type: 'poly'
  };

  for (var i = 0; i < locations.length; i++) {
    var pubs = locations[i];
    var myLatLng = new google.maps.LatLng(pubs[1], pubs[2]);
    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        icon: image,
        shape: shape,
        title: pubs[0],
        zIndex: 100,
    });
  }
}

google.maps.event.addDomListener(window, 'load', initialize);
