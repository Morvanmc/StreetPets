import React, { useState, useEffect } from 'react';
import api from '../services/api';

import './StationForm.css';

function StationForm () {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        setLatitude(latitude);
        setLongitude(longitude);
      },
      (err) => {
        console.log(err);
      },
      {
        timeout: 30000,
      }
    )
  }, []);

  async function handleAddStation(e) {
    e.preventDefault();

    await api.post('/stations', {
      name,
      status,
      latitude,
      longitude,
    })
    setName('');
    setStatus(''); 
  }

    return (
        <form onSubmit={handleAddStation}>
          <div className="input-block">
            <label htmlFor="name">Nome da Estação:</label>
            <input 
              name="name" 
              id="name" 
              value={name} 
              required
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className="input-radio-block">
            <span>Abastecida:</span>
            <label htmlFor="sim">Sim</label>
            <input name="sim" id="sim" type="radio" value="true"
             checked={status === 'true'}
             onChange={e => setStatus(e.target.value)} />
            <label htmlFor="nao">Não</label>
            <input name="nao" id="nao" type="radio" value="false"
             checked={status === 'false'}
             onChange={e => setStatus(e.target.value)} />
          </div>

          <div className="input-group">
            <div className="input-block">
              <label htmlFor="latitude">Latitude</label>
              <input
              name="latitude" 
              id="latitude"
              type="number"
              value={latitude} 
              required
              onChange={e => setLatitude(e.target.value)}
              />
            </div>  

            <div className="input-block">
              <label htmlFor="longitude">Longitude</label>
              <input 
                name="longitude" 
                id="longitude"
                type="number"
                value={longitude}  
                required
                onChange={e => setLongitude(e.target.value)}
                />
            </div>
          </div>
          <div className="button-group">
            <button type="submit">Salvar</button>
            <button type="button" value="cancel">Cancelar</button>
          </div>
        </form>
    );
};

export default StationForm;