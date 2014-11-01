var map;

function initialize() {
  var mapOptions = {
    zoom: 15,
  };

  var map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  //html5 geolocation
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);

    var marker = new google.maps.Marker({
        map: map,
        position: pos,
        title: 'You are here'
    });

      map.setCenter(pos);
    }, function() {
      handleNoGeolocation(true);
    });
  } else {
    // if Browser doesn't support Geolocation
    handleNoGeolocation(false);
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
