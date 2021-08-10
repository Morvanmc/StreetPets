import React, { useState, useEffect } from 'react';
import api from '../services/api';
import dogImg from '../img/dog.png';
import catImg from '../img/cat.png';

import './StationInfo.css';

function StationInfo() {
    const [ stations, setStations ] = useState([]);
    
    useEffect(() => {
        async function loadStations() {
            const response = await api.get('/stations');

            setStations(response.data);
        }

        loadStations();
    }, []);

    return(
        <ul>
            {stations.map(station => (
                <li className="station-item">
                <img src={station.pet_avatar === 'dog' ? dogImg : catImg} 
                        alt="Pet" />
                    <strong>{station.nameStation}</strong><br></br>
                    <span>{station.status ? 'Cheia' : 'Vazia'}</span>
                    <span>by: {station.userName}</span>               
            </li>
            ))}
        </ul>
    )
};

export default StationInfo;