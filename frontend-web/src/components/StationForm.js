import React, { useState, useEffect } from 'react';
import api from '../services/api';
import dogImg from '../img/dog.png';
import catImg from '../img/cat.png';

import './StationForm.css';

function StationForm () {
  const [nameStation, setNameStation] = useState('');
  const [pet_avatar, setPet_avatar] = useState('');
  const [status, setStatus] = useState('');
  const [userName, setUserName] = useState('');
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
      nameStation,
      pet_avatar,
      status,
      userName,
      latitude,
      longitude,
    })
    setNameStation('');
    setPet_avatar('');
    setStatus('');
    setUserName(''); 
  }

    return (
        <form onSubmit={handleAddStation}>
          <div className="cadastrar">
            <strong>Cadastrar</strong>
            <div className="input-block">
              <label htmlFor="nameStation">Nome da Estação:</label>
              <input 
                name="nameStation" 
                id="nameStation" 
                value={nameStation} 
                required
                onChange={e => setNameStation(e.target.value)}
              />
            </div>

            <div className="input-radio-block">
              <span>Tipo de animal:</span>
              <label htmlFor="dog"><img src={dogImg} alt="Dog"></img></label>
              <input name="dog" id="dog" type="radio" value="dog"
                checked={pet_avatar === 'dog'}
                onChange={e => setPet_avatar(e.target.value)} />
              <label htmlFor="cat"><img src={catImg} alt="Dog"></img></label>
              <input name="cat" id="cat" type="radio" value="cat"
                checked={pet_avatar === 'cat'}
                onChange={e => setPet_avatar(e.target.value)} />
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

            <div className="input-block">
              <label htmlFor="userName">Criada por:</label>
              <input 
                name="userName" 
                id="userName" 
                value={userName} 
                required
                onChange={e => setUserName(e.target.value)}
              />
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
          </div>
        </form>
    );
};

export default StationForm;