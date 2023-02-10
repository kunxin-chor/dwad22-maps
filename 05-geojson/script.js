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
map.setView(singapore, 13);

// initalise the tile layers
// (ie. how the map will look like)
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

async function loadData() {
    let cycleResponse = await axios.get("cycling.geojson");
    
    // draw a geojson file using leaflet
    // the first parameter for geoJson is the GEOJSON data
    // the second parameter are options (will be an object)
    let cyclingLayer = L.geoJson(cycleResponse.data,{
        // for each marker, line drawn, circle etc. etc.
        // in the GeoJSON file, each of them will be
        // passed to onEachFeature function
        // (also known as a callback function)
        onEachFeature:function(feature, layer) {
        
            // create a new empty <div>
            let el = document.createElement('div');
            // create the table in `feature.properties.Description` as HTML elements
            el.innerHTML = feature.properties.Description;
            // use querySelectorAll to find all <tds> (returns an array)
            let allTD = el.querySelectorAll('td');

            let name = allTD[0].innerHTML;
            let agency = allTD[1].innerHTML;

            // `feature` is the raw data from the GEOJSON feature
            // `layer` variable will store the layer (marker, line etc.)
            // that we are going to draw
            layer.bindPopup(`<h1>${name}</h1><h2>Agency: ${agency}`);
        }
    }).addTo(map);
    cyclingLayer.setStyle({
        'color':'red'
    })
}

loadData();