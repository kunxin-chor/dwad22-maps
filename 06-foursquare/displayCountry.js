// get a list of countries, including lat and long data,
// create a drop-down list of countries, with 
// coordinate data as values formatted as `lat,long`
// drop-down list is appended in DOM after "olderBrother" element


async function displayGetCountries(olderBrother) {

    // get required data
    const countryResponse = await axios.get('https://raw.githubusercontent.com/eesur/country-codes-lat-long/master/country-codes-lat-long-alpha3.json');
    const countryList = countryResponse.data.ref_country_codes;
    // console.log(countryList);

    // create a new drop-down element, give it HTML attributes name and id of "country"
    const dropDown = document.createElement('select');
    dropDown.name = "country";
    dropDown.id = "country";

    document.querySelector('#'+olderBrother).after(dropDown);
    countryList.forEach(countryData => {
      const countryOption = document.createElement('option');
      countryOption.innerText = countryData.country;
      countryOption.value = `${countryData.latitude},${countryData.longitude}`
      // set singapore as the default option
      if (countryData.country === "Singapore") {
        countryOption.setAttribute('selected','selected')
      }
      dropDown.appendChild(countryOption);
    })
  }
  
