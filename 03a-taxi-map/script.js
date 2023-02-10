// when solving any kind of problems, we break then down
// into steps
// 1. display the map
// 2. use axios to get all the taxi positions and display in console
// 3. test out marker clustering with some markers
// 4. create one marker per taxi positions
// 5. try putting each marker into the marker cluster
// 6. PROFIT

// to display the map: we need a center point
let map = L.map('map').setView([ 1.2879, 103.8517], 8);

// setup the tile layer
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
