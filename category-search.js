(function() {
  // Obtain an Explore object through which to submit search requests:
  var explore = new H.places.Explore(platform.getPlacesService()),
    exploreResult,
    error;

  // Create a group object to hold map markers:
  var group = new H.map.Group();

  // Create the default UI components:
  var ui = H.ui.UI.createDefault(map, platform.createDefaultLayers());

  // Add the group object to the map:
  map.addObject(group);

  // Define search parameters:
  var params = {
    // Look for places matching the category "eat and drink":
    cat: "eat-drink",
    // Search in the Chinatown district in San Francisco:
    at: "60.1733244,24.9410248"
  };

  // Define a callback function to handle data on success:
  function onResult(data) {
    addPlacesToMap(data.results);
  }

  // Define a callback function to handle errors:
  function onError(data) {
    console.log("errorr", data);
    error = data;
  }

  // This function adds markers to the map, indicating each of
  // the located places:
  function addPlacesToMap(result) {
    group.addObjects(
      result.items.map(function(place) {
        var marker = new H.map.Marker({
          lat: place.position[0],
          lng: place.position[1]
        });
        return marker;
      })
    );
  }

  // Run a search request with parameters, headers (empty), and callback functions:
  explore.request(params, {}, onResult, onError);
})();
