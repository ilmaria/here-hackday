window.Platform = new H.service.Platform({
  useCIT: true,
  app_id: "3CbRKU6RtPhIp2t4OzQI",
  app_code: "gfHFsKFQlPRuScYyeLMIAA"
});

var maptypes = Platform.createDefaultLayers();

// Instantiate (and display) a map object:
window.HEREmap = new H.Map(
  document.getElementById("mapContainer"),
  maptypes.normal.map,
  {
    zoom: 13,
    center: { lat: 60.17, lng: 24.94 }
  }
);
