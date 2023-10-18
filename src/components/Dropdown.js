import React, { useState, useEffect } from 'react';
import './Drop.css'
import jsonData  from './Jdata';
//importing json data  
const Dropdowns = () => {
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [citySearch, setCitySearch] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
// variables used for setting states for components
    const handleDarkModeToggle = () => {
    // console.log(darkMode,"mode");
        if(darkMode=== false){
          document.body.classList.remove('dark-mode');
        }
        else{
          document.body.classList.add('dark-mode');
        }
        setDarkMode(!darkMode);
    };
//handling dark mode
  const handleReset = () => {
    setCities([]);
    setState(''); 
    setSelectedCity(''); 
    setCitySearch(''); 
    setShowSuggestions(false); 
    const stateDropdown = document.getElementById('state');
    stateDropdown.value = '';
    // Set the selected value to empty
  };
//handling resetting of selections made
  const handleCountryChange = (event) => {
    const selectedCountry = event.target.value;
    setCountry(selectedCountry);
    setState(''); 
    setSelectedCity(''); 
    setCitySearch(''); 
    setShowSuggestions(false);
  };
//handling country change 
  const handleStateChange = (event) => {
    const selectedState = event.target.value;
    setState(selectedState);
    setSelectedCity(''); 
    setCitySearch(''); 
    setShowSuggestions(false);
    // Automatically selecting all cities when a state is selected
    const citiesForSelectedState = getCitiesForState(selectedState);
    const cityIdsForSelectedState = citiesForSelectedState.map(city => city.id);
    setCities(cityIdsForSelectedState);
  };
//handling state change
  const handleCityChange = (event) => {
    const cityId = parseInt(event.target.value);
    if (cities.includes(cityId)) {
      setCities(cities.filter((id) => id !== cityId));
    } else {
      setCities([...cities, cityId]);
    }
  };
//handling city change
  const handleCitySearch = (event) => {
    const searchTerm = event.target.value;
    setCitySearch(searchTerm);
    setShowSuggestions(true);
  };
//handling the search city functionality
  const handleSuggestionClick = (state) => {
    setState(state.state);
    setCitySearch('');

    // Automatically select all cities when a state is selected
    const citiesForSelectedState = getCitiesForState(state.state);
    const cityIdsForSelectedState = citiesForSelectedState.map((city) => city.id);
    setCities(cityIdsForSelectedState);
  };

  useEffect(() => {
    // Update cities when state changes
    if (state !== '') {
      const citiesForSelectedState = getCitiesForState(state);
      const cityIdsForSelectedState = citiesForSelectedState.map((city) => city.id);
      setCities(cityIdsForSelectedState);
    }
  }, [state]);

  const handleSubmit = () => {
    const selectedCityNames = cities.map((cityId) => {
      const city = getCitiesForState(state).find((city) => city.id === cityId);
      return city ? city.name : '';
    });
    
    console.log('Selected Country:', country);
    console.log('Selected State:', state);
    console.log('Selected Cities:', selectedCityNames);
    alert("You have submitted your selections , Open Console to preview")
    // code snippet to Make API call
    fetch('https://countriesnow.space/api/v0.1/countries/state/cities', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        country: country,
        state: state,
      }),
    })
      .then((response) => response.json())
      // .then((data) => {
      //   // console.log('List of states:', data.data);
      //   //free api failing 
      // })
      // .catch((error) => console.error('Error fetching cities:', error));
  };
  
  //handling submit functionality

  const getCitiesForState = (selectedState) => {
    const countryData = jsonData.find((data) => data.country.toLowerCase() === country.toLowerCase());
    if (countryData) {
      const stateData = countryData.state.find((state) => state.state.toLowerCase() === selectedState.toLowerCase());
      return stateData ? stateData.city : [];
    }
    return [];
  };
  const getSuggestedStates = () => {
    const states = jsonData
      .filter(data => data.country.toLowerCase() === country.toLowerCase())
      .flatMap(data => data.state)
      .filter(state => state.state.toLowerCase().includes(citySearch.toLowerCase()));
    return states.slice(0, 5); // Limit to 5 suggestions
  };
//handling the autocomplete suggestions in search bar
  return (
    <div className={`container ${darkMode ? 'dark-mode' : ''}`}>
      <div className="search-bar">
        <label htmlFor="citySearch"> </label>
        <input
          type="text"
          id="citySearch"
          value={citySearch}
          onChange={handleCitySearch}
          placeholder="Search State After Selecting Country"
        />
        {showSuggestions && citySearch && (
          <div className="suggestions">
            {getSuggestedStates().map((state, index) => (
              <div
                key={index}
                className="suggestion-item"
                onClick={() => handleSuggestionClick(state)}
              >
                {state.state}
              </div>
            ))}
          </div>
        )}
      </div>
   
      <div className="dropdowns">
        <div className="dropdown">
      
          <label htmlFor="country">Country:</label>
          <select id="country" className="selectstyle" onChange={handleCountryChange}>
            <option key="default" value="">Select Country</option>
           {/* Dynamically fetching country from data*/}
            {jsonData.map((data) => (
              
              <option key={data.country} value={data.country}>
                {data.country}
              </option>
            ))}
          </select>
        </div>
        {country && (
          <div className="dropdown">
            <label htmlFor="state" className="styleLabel">State:</label>
            <select
              id="state"
              onChange={handleStateChange}
              className="styleSelectNew"
              ref={(el) => el && (el.value = state)} // Set the initial selected value
            >
            <option key="default" value="">
              Select State
            </option>
             {/* Dynamically fetching state from data */}
            {jsonData
              .find((data) => data.country.toLowerCase() === country.toLowerCase())
              ?.state.map((stateData) => (
                <option key={stateData.id} value={stateData.state}>
                  {stateData.state}
                </option>
              ))}
            </select>
          </div>
        )}

       {state && (
          <div className="checkbox-group">
            <label htmlFor="cities"></label>
            <div className="checkboxes">
{/* Dynamically fetching cities associated with the selected state from data and marking them checked by defualt*/}
              {getCitiesForState(state).map((city) => (
                <div key={city.id} className="checkbox-wrapper">
                  <input
                    type="checkbox"
                    value={city.id}
                    id={`city-${city.id}`}
                    onChange={handleCityChange}
                    checked={cities.includes(city.id)} // Check if city is selected
                  />
                  <label htmlFor={`city-${city.id}`} className="city-label">
                    {city.name}
                  </label>
                </div>
              ))}
           </div>
           </div>
       )}

      </div>
      <div>
        {/* adding switch button , submit button and reset button */}
      <div className="switch">
                <label> 
              
                    <input type="checkbox" onChange={handleDarkModeToggle} />
                    <span className="slider"></span>
                </label>
    
            </div>
            <button className="submit-button" onClick={handleSubmit}>Submit</button>
      <button className="reset-button" onClick={handleReset}>Reset Selections</button>
            </div>
    </div>
  );
};

export default Dropdowns;
