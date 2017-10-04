(function() {
  // Obtain an Explore object through which to submit search requests:
  var explore = new H.places.Explore(platform.getPlacesService()),
    exploreResult,
    error;

  // Enable the event system on the map instance:
  var mapEvents = new H.mapevents.MapEvents(map);

  var behavior = new H.mapevents.Behavior(mapEvents);

  // Create the default UI components:
  var ui = H.ui.UI.createDefault(map, platform.createDefaultLayers());

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
    error = data;
  }

  // This function adds markers to the map, indicating each of
  // the located places:
  function addPlacesToMap(result) {
    result.items.map(function(place) {
      var group = new H.map.Group();
      var marker = new H.map.Marker({
        lat: place.position[0],
        lng: place.position[1]
      });
      group.addObject(marker);
      map.addObject(group);
      marker.addEventListener("tap", function(e) {
        var bubble = new H.ui.InfoBubble(
          {
            lat: place.position[0],
            lng: place.position[1]
          },
          {
            content: place.title
          }
        );
        ui.addBubble(bubble);
      });
      return marker;
    });
  }

  // Run a search request with parameters, headers (empty), and callback functions:
  explore.request(params, {}, onResult, onError);
})();
