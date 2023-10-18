



// import React, { useState, useEffect, useCallback } from 'react';
// import './Drop.css'


// const jsonData = [
//   {
//       "id": 1,
//       "country": "india",
//       "state": [
//           {
//               "id": 1,
//               "state": "Madhyapradesh",
//               "city": [
//                   {
//                       "id": 1,
//                       "name": "Indore"
//                   },
//                   {
//                       "id": 2,
//                       "name": "Bhopal"
//                   },
//                   {
//                       "id": 3,
//                       "name": "Harda"
//                   }
//               ]
//           },
//           {
//               "id": 2,
//               "state": "West Bengal",
//               "city": [
//                   {
//                       "id": 1,
//                       "name": "Kolkata"
//                   },
//                   {
//                       "id": 2,
//                       "name": "Alipurduar"
//                   },
//                   {
//                       "id": 3,
//                       "name": "Bankura"
//                   }
//               ]
//           },
//           {
//               "id": 3,
//               "state": "Karnataka",
//               "city": [
//                   {
//                       "id": 1,
//                       "name": "Shivamogga"
//                   },
//                   {
//                       "id": 2,
//                       "name": "Udupi"
//                   },
//                   {
//                       "id": 3,
//                       "name": "Vijayapura"
//                   },
//                   {
//                       "id": 4,
//                       "name": "Bengalore"
//                   }
//               ]
//           }
//       ]
//   }
// ];

// const CityCheckbox = ({ city, isSelected, onCityChange }) => {
//   return (
//     <div key={city.id} className="city-checkbox">
//       <div className="city-div">
//         <input
//           type="checkbox"
//           value={city.id}
//           id={`city-${city.id}`}
//           onChange={() => onCityChange(city.id)}
//           checked={isSelected}
//         />
//         <label htmlFor={`city-${city.id}`}>{city.name}</label>
//       </div>
//     </div>
//   );
// };

// const StateCheckbox = ({ state, selectedCities, onCityChange, setSelectedCities }) => {
//   const handleStateChange = (stateName, isChecked) => {
//     const selectedState = jsonData.find(data => data.state.some(state => state.state.toLowerCase() === stateName.toLowerCase()));
//     if (selectedState) {
//       const citiesToDeselect = selectedState.state.flatMap(state => state.city.map(city => city.id));
//       const newSelectedCities = isChecked
//         ? selectedCities.concat(citiesToDeselect)
//         : selectedCities.filter(cityId => !citiesToDeselect.includes(cityId));
//       setSelectedCities(newSelectedCities);
//     }
//   };

//   return (
//     <div key={state.id} className="state-checkbox">
//       <div className="state-div">
//         <div className="state-header">
//           <input
//             type="checkbox"
//             value={state.state}
//             id={`state-${state.state}`}
//             onChange={(e) => handleStateChange(state.state, e.target.checked)}
//             checked={state.city.every(city => selectedCities.includes(city.id))}
//           />
//           <label htmlFor={`state-${state.state}`}>{state.state}</label>
//         </div>
//         {state.city.map(city => (
//           <CityCheckbox
//             key={city.id}
//             city={city}
//             isSelected={selectedCities.includes(city.id)}
//             onCityChange={onCityChange}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// const CountryCheckbox = ({ country, selectedCities, onCityChange, setSelectedCities }) => {
//   const handleCountryChange = () => {
//     country.state.forEach(state => {
//       state.city.forEach(city => {
//         onCityChange(city.id, true);
//       });
//     });
//     const allCityIds = country.state.flatMap(state => state.city.map(city => city.id));
//     setSelectedCities(allCityIds);
//   };

//   return (
//     <div key={country.id} className="country-checkbox">
//       <div className="country-div">
//         <div className="country-header">
//           <input
//             type="checkbox"
//             value={country.country}
//             id={`country-${country.country}`}
//             onChange={handleCountryChange}
//             checked={country.state.every(state =>
//               state.city.every(city => selectedCities.includes(city.id))
//             )}
//           />
//           <label htmlFor={`country-${country.country}`}>{country.country}</label>
//         </div>
//         {country.state.map(state => (
//           <StateCheckbox
//             key={state.id}
//             state={state}
//             selectedCities={selectedCities}
//             onCityChange={onCityChange}
//             setSelectedCities={setSelectedCities}  // Pass down the function here
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// const Dropdowns = () => {
//   const [selectedCities, setSelectedCities] = useState([]);
//   const [citySearch, setCitySearch] = useState('');
//   const [showSuggestions, setShowSuggestions] = useState(false);

//   // Placeholder for handleCityChange function - replace with your logic
//   const handleCityChange = (cityId, isChecked) => {
//     if (isChecked) {
//       setSelectedCities(prevSelectedCities => [...prevSelectedCities, cityId]);
//     } else {
//       setSelectedCities(prevSelectedCities =>
//         prevSelectedCities.filter(id => id !== cityId)
//       );
//     }
//   };

//   const handleCitySearch = (event) => {
//     const searchTerm = event.target.value;
//     setCitySearch(searchTerm);
//     setShowSuggestions(true);
//   };

//   const handleSuggestionClick = useCallback((state) => {
//     const newSelectedCities = state.city.map(city => city.id);
//     setSelectedCities(newSelectedCities);
//     setShowSuggestions(false);
//   }, []);

//   const getSuggestedStates = () => {
//     const states = jsonData
//       .flatMap(data => data.state)
//       .filter(state => state.state.toLowerCase().includes(citySearch.toLowerCase()));
//     return Array.from(new Set(states)).slice(0, 5); // Limit to 5 suggestions
//   };

//   return (
//     <div className="container">
//       <div className="search-bar">
//         <input
//           type="text"
//           placeholder="Search for a state..."
//           value={citySearch}
//           onChange={handleCitySearch}
//         />
//         {showSuggestions && (
//           <div className="suggestions">
//             {getSuggestedStates().map(state => (
//               <div
//                 key={state.id}
//                 onClick={() => handleSuggestionClick(state)}
//                 className="suggestion-item"
//               >
//                 {state.state}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {jsonData.map(country => (
//         <CountryCheckbox
//           key={country.id}
//           country={country}
//           selectedCities={selectedCities}
//           onCityChange={handleCityChange}
//           setSelectedCities={setSelectedCities}
//         />
//       ))}
//     </div>
//   );
// };

// export default Dropdowns;

