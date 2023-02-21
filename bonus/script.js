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
map.setView(singapore, 10);

// initalise the tile layers
// (ie. how the map will look like)
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// put a marker at singapore
// L.marker returns an object that represent a marker on a map
let singaporeMarker = L.marker(singapore);
singaporeMarker.addTo(map);

// pass in a HTML string as the first argument
// OR an annoymous function that returns HTML
singaporeMarker.bindPopup(`<div id="singapore"><h1>Welcome to Singapore</h1>
<img src="welcome-to-sg.jfif"/></div>
`);

// first index of array is the lat
// second index of the array is lng
let trentGlobalCoordinate = [1.307,103.88 ];
let trentGlobal = L.marker(trentGlobalCoordinate);
trentGlobal.addTo(map);

trentGlobal.bindPopup(function(){
    return `<h1>Hello Trent Global</h1>`    
});

let goldenMile = L.marker([1.302, 103.8652]);
goldenMile.addTo(map);

goldenMile.addEventListener("mouseover", function(){
    console.log("Mouse cursor entered golden mile")
})

let circle = L.circle([1.329,103.802 ],{
    radius: 500,
    color: "red", // line color (can use hexdecimal numbers)
    fillColor: "orange", 
    fillOpacity: 0.5
});

circle.addTo(map);

// How to add a button to bind popup and give it an event listener
circle.bindPopup(function(){
    // Create an empty element to represent the pop up. <div> is the best
    const popup = document.createElement('div');

    // create elements inside the empty in the popup element using innerHTML
    // with template literals. Make sure the button you want to bind the popup
    // to have an unique ID
    popup.innerHTML = `
        <h1>Circle of Life</h1>
        <button id="clickBtn">Click me</button>
    `

    // use querySelector to select the button INSIDE the popup
    // take note we are calling querySelector ON the popup
    const button = popup.querySelector("#clickBtn");

    // EXAMPLE 1:
    // button.addEventListener("click", function(){
    //     alert ("hi ma!");
    // });

    // EXAMPLE 2
    button.addEventListener("click", handleButtonClick);

    return popup; // make sure to return the element that will become the popup
})

function handleButtonClick() {
    alert("hi ma!");
}