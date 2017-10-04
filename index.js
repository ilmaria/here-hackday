var platform = new H.service.Platform({
  useCIT: true,
  app_id: "3CbRKU6RtPhIp2t4OzQI",
  app_code: "gfHFsKFQlPRuScYyeLMIAA"
});

// Obtain an Explore object through which to submit search requests:
var explore = new H.places.Explore(platform.getPlacesService()),
  exploreResult,
  error;

// Define search parameters:
var params = {
  // Look for places matching the category "eat and drink":
  cat: "eat-drink",
  // Search in the Chinatown district in San Francisco:
  in: "37.7942,-122.4070"
};

// Run a search request with parameters, headers (empty), and callback functions:
explore.request(params, {}, onResult, onError);

// Define a callback function to handle data on success:
function onResult(data) {
  exploreResult = data;
}

// Define a callback function to handle errors:
function onError(data) {
  error = data;
}

// Run a search request with parameters, headers (empty), and callback functions:
explore.request(params, {}, onResult, onError);
