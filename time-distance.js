function fetchFromApi(path, params) {
  var apiKeys = {
    app_id: '3CbRKU6RtPhIp2t4OzQI',
    app_code: 'gfHFsKFQlPRuScYyeLMIAA'
  };
  var urlParams = Object.assign(apiKeys, params);
  var queryParams = Object.keys(urlParams)
    .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(urlParams[k]))
    .join('&');
  console.log('query params', path, queryParams);
  var url =
    'https://cit.transit.api.here.com/v3/' + path + '.json?' + queryParams;

  return fetch(url).then(function(response) {
    return response.json();
  });
}

function timeToLocation(currentLoc, destination) {
  var router = platform.getRoutingService();

  // Call calculateRoute() with the routing parameters,
  // the callback and an error callback function (called if a
  // communication error occurs):
  return new Promise(function(resolve, reject) {
    router.calculateRoute(
      {
        // The routing mode:
        mode: 'fastest;publicTransport',
        // The start point of the route:
        waypoint0: currentLoc,
        // The end point of the route:
        waypoint1: destination
      },
      resolve,
      reject
    );
  });
}

(function() {
  fetchFromApi('stations/by_geocoord', {
    center: '60.17,24.94'
  })
    .then(function(data) {
      var ids = data.Res.Stations.Stn.map(function(item) {
        return item.id;
      });

      console.log(data);
      console.log(ids);
      return ids;
    })
    .then(function(ids) {
      return fetchFromApi('board', {
        stnId: ids[1],
        time: new Date().toISOString()
      });
    })
    .then(function(data) {
      console.log(data);
    });
})();
