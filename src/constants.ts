export const apiKey = '3495909d3601492a9d400039242702';

export const currentWeatherApi = (city: string) => {
  return `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;
};

export const searchWeatherApi = (city: string) => {
  return `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${city}&aqi=no`;
};
