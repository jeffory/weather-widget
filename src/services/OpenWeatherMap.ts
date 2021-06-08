import { OpenWeatherResponse } from '@/declarations/interfaces/OpenWeatherMap.interface';

export class OpenWeatherMap {
  baseAPIUrl = 'https://api.openweathermap.org/data/2.5/weather'

  apiToken = process.env.VUE_APP_OPEN_WEATHER_MAP_API_TOKEN;

  weatherByID = (id: number): Promise<OpenWeatherResponse> => new Promise((resolve, reject) => {
    if (id < 0) {
      reject(new Error('Bad location id'));
    }

    fetch(`${this.baseAPIUrl}?id=${id}&appid=${this.apiToken}&units=metric`)
      .then(async (response) => {
        const data = await response.json();

        if (!response.ok) {
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }

        return data;
      })
      .then((data) => {
        resolve(data);
      });
  })

  weatherByCoords = (coords: GeolocationCoordinates): Promise<OpenWeatherResponse> => new Promise((resolve, reject) => {
    fetch(`${this.baseAPIUrl}?lat=${coords.latitude}&lon=${coords.longitude}&appid=${this.apiToken}&units=metric`)
      .then(async (response) => {
        const data = await response.json();

        if (!response.ok) {
          const error = (data && data.message) || response.statusText;
          return reject(error);
        }

        return data;
      })
      .then((data) => {
        resolve(data);
      });
  });
}
