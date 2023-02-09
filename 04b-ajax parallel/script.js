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

const hdbURL = "https://gist.githubusercontent.com/kunxin-chor/a5f5cab3e8a6ad0868134334c1432d9a/raw/ca55e99903d5913fc0e701ddab139472fe7fe4fa/hdb.json";
const mallURL = "https://gist.githubusercontent.com/kunxin-chor/a5f5cab3e8a6ad0868134334c1432d9a/raw/57f353d0aaa51805cd9bbe6bdcb12cb86e6068da/malls.json";
const natureURL = "https://gist.githubusercontent.com/kunxin-chor/a5f5cab3e8a6ad0868134334c1432d9a/raw/57f353d0aaa51805cd9bbe6bdcb12cb86e6068da/nature.json";

function foobar() {

    return 123;
}

let a = foobar();

async function main() {
   
    // call the functions without await
    // when we call any aysnc functions without using await, it returns a promise
    // a promise is an IOU for the return value of that function
    // we can await that promise
    let hdbPromise = loadHDB();
    let mallPromise = loadMalls();
    let naturePromise = loadNature();

    let hdbLayer = await hdbPromise;
    let mallLayer = await mallPromise;
    let natureLayer = await naturePromise;

    // create the base layers and the overlay
    let overlays = {
        'HDB': hdbLayer,
        'Malls': mallLayer,
        'Nature': natureLayer
    }

    // we don't want a base layer so can pass in an empty object
    // likewise if we don't want overlays then we can pass in an empty object for the second parameter
    L.control.layers({}, overlays).addTo(map);

}
async function loadHDB() {
    let hdbResponse = await axios.get(hdbURL);

    // create the layer group to store all the HDB
    let hdbLayer = L.layerGroup();
    for (let hdb of hdbResponse.data) {
        // create one marker and set its coordinate to the current hdb coordinate
        let marker = L.marker(hdb.coordinates);
        marker.bindPopup(`<h1>${hdb.name}</h1>`);
        marker.addTo(hdbLayer);
    }
    hdbLayer.addTo(map); // add layer group to map
    return hdbLayer;
}

async function loadMalls(){
    let mallResponse = await axios.get(mallURL);

    let mallLayer = L.layerGroup();
    for (let mall of mallResponse.data) {
        let circle = L.circle(mall.coordinates,{
            color: "red",
            fillColor: "red",
            radius: 200,
            fillOpacity:0.5
        });
        circle.bindPopup(`<h1>${mall.name}</h1>`)
        circle.addTo(mallLayer);
    }
    mallLayer.addTo(map);
    return mallLayer;
}

async function loadNature() {
    let natureLayer = L.layerGroup();
    let natureResponse = await axios.get(natureURL);
    for (let nature of natureResponse.data) {
        let circle = L.circle(nature.coordinates,{
            color: "green",
            fillColor: "green",
            radius: 200,
            fillOpacity:0.5
        });
        circle.bindPopup(`<h1>${nature.name}</h1>`)
        circle.addTo(natureLayer);
    }
    natureLayer.addTo(map);
    return natureLayer;
    
}

main();