// latLng is supposed to be an array with index 0 is lat and index 1 is lng
function createMap(latLng) {

    let map = L.map("map").setView(latLng,13);
  

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    return map;

}