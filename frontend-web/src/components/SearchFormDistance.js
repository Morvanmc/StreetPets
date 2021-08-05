import React from 'react';

import './SearchFormDistance.css'

function SearchFormDistance() {
    return (
        <div className="search-form">
            <div className="input-distance">
                <label htmlFor="distance">Distância KM:</label>
                <input type="number" 
                name="distancia" 
                id="distancia"/>
            </div>
        </div>
    )
};

export default SearchFormDistance;