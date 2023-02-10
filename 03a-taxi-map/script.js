// when solving any kind of problems, we break then down
// into steps
// 1. display the map
// 2. use axios to get all the taxi positions and display in console
// 3. test out marker clustering with some markers
// 4. create one marker per taxi positions
// 5. try putting each marker into the marker cluster
// 6. PROFIT

// to display the map: we need a center point
let map = L.map('map').setView([ 1.2879, 103.8517], 13);

// setup the tile layer
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

 // create the marker cluster first
// globalize the marker cluster group
let markerCluster = L.markerClusterGroup();
markerCluster.addTo(map);

async function getTaxi() {
    console.log("getting taxi");
   let response =  await axios.get("https://api.data.gov.sg/v1/transport/taxi-availability");
   let taxiMarkers = response.data.features[0].geometry.coordinates 
   
   markerCluster.clearLayers();

   for (let m of taxiMarkers) {
    let lat = m[1];  // for this API, their coordinates are in [lng, lat]
    let lng = m[0];
    let newCoordinate = [lat, lng];
    let taxi = L.marker(newCoordinate);
    taxi.addTo(markerCluster);
   }
}
getTaxi();

setInterval(function(){
    getTaxi();
}, 1000 * 60)
