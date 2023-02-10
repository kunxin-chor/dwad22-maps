const FOURSQUARE_API_KEY = "fsq3NQ6pHioQR66g0UL0TTjNa+dnurFReh1rqaFzBzXfo5g=";

async function loadData(lat, lng, query) {
    let response = await axios.get("https://api.foursquare.com/v3/places/search", {
        // headers are like the enevelope that contains the letter   
        // usually in the headers we have meta-information (meta-data)
        // api keys etc. 
        "headers": {
            // The 'Accept' and 'Authorization' must be upper case
            "Accept": "application/json",  // tells FourSquare we wants to use JSON
            "Authorization": FOURSQUARE_API_KEY
        },
        "params": {
            "ll": lat+","+lng,  // combine lat and lng into one string seperated by a comma
            "query":query,
            "limit": 50
        }
    });

    return response.data;
}