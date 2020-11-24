import React from "react";
import "./weather.styles.scss";

import {
  TiWeatherCloudy,
  TiWeatherDownpour,
  TiWeatherNight,
  TiWeatherPartlySunny,
  TiWeatherShower,
  TiWeatherSnow,
  TiWeatherStormy,
  TiWeatherSunny,
  TiWeatherWindyCloudy,
  TiWeatherWindy
} from "react-icons/ti";

import { BiSad } from "react-icons/bi";

class BackgroundHero extends React.Component {
  state = {
    loading: true,
    weather: null
  };

  // TODO:
  // Store weather data (offline or Firestore), refresh every 5/10 mins (only if window has focus, need to store time of last retrieval etc too)

  fetchWeather() {
    var self = this;
    fetch(
      "https://community-open-weather-map.p.rapidapi.com/weather?q=Northwich,uk&units=metric",
      {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "cbe81d7a45mshfa496d99301c915p1a30ddjsn0b88d122bad9",
          "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"
        }
      }
    )
      .then(response => response.json())
      .then(response => {
        self.setState({
          loading: false,
          weather: response
        });
      });
  }

  componentDidMount() {
    // this.fetchWeather();
  }

  render() {
    if (this.state.weather !== null) {
      const weather = this.state.weather;

      return weather.message ? (
        <div className="weather weather--unavailable">
          <BiSad />
        </div>
      ) : (
        <div className="weather">
          <div className="weather__forecast">
            <div
              className="weather__icon"
              title={weather.weather[0].description}
            >
              <TiWeatherSunny />
            </div>
            <div className="weather__temp">
              {Math.round(weather.main.temp)}°
            </div>
          </div>
          <div className="weather__location">{weather.name}</div>
        </div>
      );
    } else {
      return <div className="weather weather--loading" />;
    }
  }
}

export default BackgroundHero;
