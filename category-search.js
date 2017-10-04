(function() {
  // Obtain an Explore object through which to submit search requests:
  var explore = new H.places.Explore(Platform.getPlacesService()),
    exploreResult,
    error;

  // Define search parameters:
  var params = {
    // Look for places matching the category "eat and drink":
    cat: "eat-drink",
    // Search in the Chinatown district in San Francisco:
    in: "24.9410248,-60.1733244"
  };
  console.log("here", HEREmap, HEREmap.getViewPort());

  /*var headers = {
    // Location context in header based on map view of the device:
    "X-Map-Viewport": "13.3704,52.5122,13.4194,52.5262"
  };*/

  /*var svgMarkup =
    '<svg width="24" height="24" ' +
    'xmlns="http://www.w3.org/2000/svg">' +
    '<rect stroke="white" fill="#1b468d" x="1" y="1" width="22" ' +
    'height="22" /><text x="12" y="18" font-size="12pt" ' +
    'font-family="Arial" font-weight="bold" text-anchor="middle" ' +
    'fill="white">H</text></svg>';*/

  // Define a callback function to handle data on success:
  function onResult(data) {
    /*console.log("hiphuraa!");
    exploreResult = data;

    var icon = new H.map.Icon(svgMarkup),
      coords = { lat: 60.1733244, lng: 24.9410248 },
      marker = new H.map.Marker(coords, { icon: icon });
    HEREmap.addObject(marker);
    HEREmap.setCenter(coords);*/
  }

  // Define a callback function to handle errors:
  function onError(data) {
    error = data;
  }

  // Run a search request with parameters, headers (empty), and callback functions:
  explore.request(params, headers, onResult, onError);
})();
