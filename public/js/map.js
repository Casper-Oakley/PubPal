var map;

function initialize() {

  //var lastmarker = null;

  var mapOptions = {
    zoom: 6
    };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  //Array for json data of crime info
  var dataArray = <%- dataArray %>;
  var pubmapData = [];
  for(var i = 0; i < dataArray.length; i++){
    pubmapData.push(new google.maps.LatLng( dataArray[i].latitude, dataArray[i].longitude));
  }
  console.log(pubmapData);

  //draw heatmap

  /*
  //text of info window
  var siteContent = '<div id="siteNotice">'+
  '</div>'+
  '<h1 id="firstHeading" class="firstHeading">Transporters in your area</h1>'+
  '<div id="bodyContent">'+
  '<p>Choose from a range of Getaway drivers in the area</p>'+
  '<img src="https://farm8.staticflickr.com/7235/13231481773_ae7804a289_s.jpg" align="left" alt="Cristiano" height="75" width="75">'+
  '<p style="font-size:15px">Price £100</p>'+
  '<p><a data-person="cristiano" style="font-size: 20px; text-decoration: none">Book Christiano aka "The Viking"</a></p>'+
  '</div>';

  Braintree payment interface
  var payContent = '<form id="checkout" method="post" action="/checkout">' +
  '<div id="siteNotice"></div>' +
  '<input type="submit" value="Pay $100">' +
  '</form>';


  info window displaying context on button
  var infowindow = new google.maps.InfoWindow({
    content: contained(siteContent),
    Width: 800
  });

  google.maps.event.addListener(map, 'click', function(event) {
    placeMarker(event.latLng);
  });

  document.onclick = function(e) {
    if (e.target && e.target.dataset && e.target.dataset.person) {
      e.preventDefault();
      e.stopPropagation();
      document.getElementById('content').innerHTML = payContent;
      return 0;
    }
  };
  function placeMarker(location) {
    var marker = new google.maps.Marker({
      position: location,
      map: map,
      title: 'Book Transporter'
    });
    if (lastmarker) {
      lastmarker.setMap(null);
    }
    lastmarker = marker;
    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map,marker);
    });
  } */
}

google.maps.event.addDomListener(window, 'load', initialize);

/* braintree.setup("Client-Token-From-Server", 'dropin', {
  container: 'siteNotice'
}); */
