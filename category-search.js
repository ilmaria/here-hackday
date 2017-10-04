var currentPos = [60.1733244, 24.9410248];
var markerGroups = [];
var explore = new H.places.Explore(platform.getPlacesService()),
  exploreResult,
  error;

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
  markerGroups = result.items.map(function(place) {
    var group = new H.map.Group();
    var marker = new H.map.Marker({
      lat: place.position[0],
      lng: place.position[1]
    });
    group.addObject(marker);
    map.addObject(group);

    timeToLocation(currentPos.join(), place.position).then(function(data) {
      marker.addEventListener("tap", function(e) {
        var bubble = new H.ui.InfoBubble(
          {
            lat: place.position[0],
            lng: place.position[1]
          },
          {
            content:
              place.title +
              " - " +
              (data.response.route[0].summary.travelTime / 60).toFixed(0) +
              " min"
          }
        );
        ui.addBubble(bubble);
      });
    });

    return group;
  });
}

function changeCategory() {
  var selected = document.getElementById("menu");
  var category = selected.options[selected.selectedIndex].value;

  console.log("valitsit", category);
  map.removeObjects(markerGroups);
  markerGroups = [];
  var params = {
    cat: category,
    at: currentPos.join()
  };
  explore.request(params, {}, onResult, onError);
}

// Enable the event system on the map instance:
var mapEvents = new H.mapevents.MapEvents(map);

var behavior = new H.mapevents.Behavior(mapEvents);

// Create the default UI components:
var ui = H.ui.UI.createDefault(map, platform.createDefaultLayers());

(function() {
  // Obtain an Explore object through which to submit search requests:

  // Define search parameters:
  var params = {
    // Look for places matching the category "eat and drink":
    cat: "",
    // Search in the Chinatown district in San Francisco:
    at: currentPos.join()
  };

  var icon = new H.map.DomIcon(
    '<svg height="26" width="26">' +
      '<circle cx="13" cy="13" r="10" stroke="black" stroke-width="3" fill="red" />' +
      "</svg>"
  );
  var currentPosGroup = new H.map.Group();
  var currentPosMarker = new H.map.DomMarker(
    { lat: currentPos[0], lng: currentPos[1] },
    {
      icon: icon
    }
  );
  currentPosGroup.addObject(currentPosMarker);
  map.addObject(currentPosGroup);

  // Run a search request with parameters, headers (empty), and callback functions:
  explore.request(params, {}, onResult, onError);
})();
