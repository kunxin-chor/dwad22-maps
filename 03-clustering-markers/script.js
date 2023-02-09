let singapore = [1.29, 103.85];  // stores the lat lng of Singapore

// create a Leaflet map object
// L is the global Leaflet object
// we can use it when we include the
// Leaflet JS

// L.map creates a new map
// the first paramer is the ID of the
// element that you want the map to appear in
let map = L.map('singaporeMap');

// setView sets the center point of the map
// second parameter is the starting zoom level
map.setView(singapore, 12);

// initalise the tile layers
// (ie. how the map will look like)
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// the first argument, map, is the map object created from L.map
function getRandomLatLng(map) {
    // get the boundaries of the map
    let bounds = map.getBounds();
    console.log(bounds);
    let southWest = bounds.getSouthWest();
    let northEast = bounds.getNorthEast();

    let lngSpan = northEast.lng - southWest.lng;
    let latSpan = northEast.lat - southWest.lat;

    let randomLng = Math.random() * lngSpan + southWest.lng;
    let randomLat = Math.random() * latSpan + southWest.lat;

    return [ randomLat, randomLng];
}

// In leaflet of layer groups: a layer that contains other layers
// a layer is anything that can appear on top of the map
// the marker cluster is a special layer group
// ANY markers put into it will be grouped together
let markerClusterLayer = L.markerClusterGroup();  // <-- markerClusterGroup() is only available from L
                                                  // but because of marker group JS file that we have included

for (let i = 0; i < 1000; i++) {
    // we can access `map` because it's a global variable
    let coordinate = getRandomLatLng(map);
    // add the marker to the marker cluster
    L.marker(coordinate).addTo(markerClusterLayer);
}

// all layers (regardless of what it is) must be added to the map
markerClusterLayer.addTo(map);