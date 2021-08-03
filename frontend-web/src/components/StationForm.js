import React from 'react';

function StationForm () {

    return (
        <form>
          <div className="input-block">
            <label htmlFor="name">Nome da Estação:</label>
            <input 
              name="name" 
              id="name" 
              required
            />
          </div>
          <div className="input-block">
            <label htmlFor="status">Abastecida:</label>
            <input name="Sim" id="sim" type="radio" value="true" required />Sim
            <input name="Não" id="nao" type="radio" value="false" required />Não
          </div>

          <div className="input-group">
            <div className="input-block">
              <label htmlFor="latitude">Latitude</label>
              <input
              name="latitude" 
              type= "number" 
              id="latitude" 
              required
              />
            </div>  

            <div className="input-block">
              <label htmlFor="longitude">Longitude</label>
              <input 
                name="longitude" 
                type= "number" 
                id="longitude" 
                required
                />
            </div>
          </div>

          <button type="submit">Salvar</button>

        </form>
    );
};

export default StationForm;