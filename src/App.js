import './App.css';
import React, { useState } from 'react';
import userEvent from '@testing-library/user-event';

const api = {
  key: "267bdb4ce80dd45605c481d29ba1e7a9",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if(evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result)
        });
    }
  }

  function convertTime(unixTime, offset){
    let dt = new Date((unixTime * 1000 + (offset * 1000)) - 28800000).toLocaleTimeString()
    return dt
  }


  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`
  }

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app '}>
      <div className="forekastr">
        <h1>f</h1><h1>o</h1><h1>r</h1><h1>e</h1><h1>k</h1><h1>a</h1><h1>s</h1><h1>t</h1><h1>r</h1>
      </div>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search a place..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        <hr/>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <p className="latLang">lat: {weather.coord.lat}, long: {weather.coord.lon}</p>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>

            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp)}°c
              </div>
              <div className="weather">{weather.weather[0].description}</div>
              <div className="itemsBox">
                <div className="items">
                  <span className="iconify iconify2" data-icon="wi-humidity" data-inline="false"></span>
                  <p className="itemsTitle">humidity:</p>
                  <p className="itemsMargin">{weather.main.humidity}%</p>
                  <span className="iconify iconify2" data-icon="carbon:wind-stream" data-inline="false"></span>
                  <p className="itemsTitle">pressure:</p>
                  <p>{weather.main.pressure} hPa</p>
                  <span className="iconify iconify2" data-icon="la-wind" data-inline="false"></span>
                  <p className="itemsTitle">wind:</p>
                  <p className="itemsMargin">{weather.wind.speed} km/h</p>
                  <span className="iconify iconify2" data-icon="wi:wind-direction-ne" data-inline="false"></span>
                  <p className="itemsTitle">direction:</p>
                  <p>{weather.wind.deg}°</p>
                </div>
                <div className="items">
                  <span className="iconify" data-icon="vaadin-sun-rise" data-inline="false"></span>
                  <p>{convertTime(weather.sys.sunrise, weather.timezone)}</p>
                  <span className="iconify" data-icon="vaadin-sun-down" data-inline="false"></span>
                  <p>{convertTime(weather.sys.sunset, weather.timezone)}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="globe">
            <img src="https://i.gifer.com/3IsN.gif"></img>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
