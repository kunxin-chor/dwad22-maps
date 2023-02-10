// GOAL: to build a search engine that places results from Foursquare
// as markers on our Leaflet map.
// 1. get results from FourSquare into console.log
// 2. able to let user specify what they want to search
// 2a. display a textbox
// 2b. retrieve the value from the textbox when the user press submit
// 3. display a leaflet map
// 4. the foursquare results plot as markers on the leaflet map


const START_POINT = [1.287953, 103.851784];

function main() {
    let map = createMap(START_POINT);
    let searchResultLayer = L.layerGroup();
    searchResultLayer.addTo(map);

    document.querySelector("#btnSearch").addEventListener("click", async function () {
        let searchValue = document.querySelector('#searchValue').value;
        let countryCoordinates = document.querySelector('#country').value.split(",").map(Number);
        let searchResults = await loadData(countryCoordinates[0], countryCoordinates[1], searchValue);
        
        // recenter map on new country
        map.flyTo(countryCoordinates, 12);

        // remove all the existing markers from the previous search in the layer
        searchResultLayer.clearLayers();

        // remove all children from a parent (to clear all the search results from the search container)
        document.querySelector('#search-results').innerHTML = "";

        // add in the new markers
        for (let result of searchResults.results) {

            // create a new marker and add to map
            let coordinate = [result.geocodes.main.latitude, result.geocodes.main.longitude];
            let marker = L.marker(coordinate).addTo(searchResultLayer);
            marker.bindPopup(`<h1>${result.name}</h1>
            <h2>${result.location.formatted_address}</h2>`);

            // create a new search result in it's own div
            let resultElement = document.createElement('div');
            // add the .search-item class to the result element
            resultElement.classList.add("search-item");
            resultElement.innerText = result.name;
            document.querySelector('#search-results').appendChild(resultElement);

            resultElement.addEventListener("click", function(){
                map.flyTo(coordinate, 16);
                marker.openPopup();
            })


        }
    });
}

// DOMContentLoaded event waits for all the HTML elements
// to be created first
// `window` refers to the browser window
window.addEventListener("DOMContentLoaded", function(){
    displayGetCountries("searchValue")
    main();
})


