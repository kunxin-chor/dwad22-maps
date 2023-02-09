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
    let southWest = bounds.getSouthWest();
    let northEast = bounds.getNorthEast();

    let lngSpan = northEast.lng - southWest.lng;
    let latSpan = northEast.lat - southWest.lat;

    let randomLng = Math.random() * lngSpan + southWest.lng;
    let randomLat = Math.random() * latSpan + southWest.lat;

    return [ randomLat, randomLng];
}

// a layer group to group layers (a layer can be a marker, a circle etc.)
let group = L.layerGroup();

// create random markers to add to the layer group
for (let i =0; i < 5; i++) {
    let coordinate  = getRandomLatLng(map);
    L.marker(coordinate).addTo(group);  // don't add to map, add to the group
}
group.addTo(map);

let circleGroup = L.layerGroup();

for (let i=0; i < 5; i++) {
    let coordinate = getRandomLatLng(map);
    let circle = L.circle(coordinate, {
        'color': 'green',
        'fillColor': 'green',
        'fillOpacity': 0.5,
        'radius': 250
    });
    circle.addTo(circleGroup);
}
circleGroup.addTo(map);

let redCircleGroup = L.layerGroup();
for (let i=0; i < 5; i++) {
    let coordinate = getRandomLatLng(map);
    let circle = L.circle(coordinate, {
        'color': 'red',
        'fillColor': 'red',
        'fillOpacity': 0.5,
        'radius': 250
    });
    circle.addTo(redCircleGroup);
}
redCircleGroup.addTo(map);

// The Leaflet has layer control that allows us to toggle layers on and off
// base layers : can only select one and must have at least one
// overlays: can select as many as you want or none

let baseLayers = {
    'Markers': group,
    'Red Circles': redCircleGroup  // console.log(baseLayers["Red Circles"])
};

let overlays = {
    'Green Circle': circleGroup
}

// Create a layer control and add to the map
// parameter 1: base layer
// parameter 2: overlays
L.control.layers(baseLayers,  overlays).addTo(map);

document.querySelector("#toggleBtn").addEventListener('click', function(){
    // we can access the map variable in this function because
    // the map variable is global

    // if the redCircleGroup is visible
    if (map.hasLayer(redCircleGroup)) {
        map.removeLayer(redCircleGroup); // remove a layer from a map
    } else {
        // make the red circles appear
        map.addLayer(redCircleGroup);
    }
})