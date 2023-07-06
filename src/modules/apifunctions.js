const APIKey = (() => {
  const key = '9fd870113b9a4c77a8494435230507';

  const getAPIKey = () => key;

  return { getAPIKey };
})();

const APIModule = (() => {
  const buildRequestURL = (whatUserWantsToDo, key, query) => `https://api.weatherapi.com/v1/${whatUserWantsToDo}.json?key=${key}&q=${query}`;

  const getAutocompleteLocations = (arrayOfObjects) => arrayOfObjects.map((obj) => obj.name);

  const currentWeatherFactory = (location, temperature, conditionText, conditionIcon, wind, humidity, precipitation, lastUpdated) => ({
    location,
    temperature,
    conditionText,
    conditionIcon,
    wind,
    humidity,
    precipitation,
    lastUpdated,
  });

  const convertDataToObject = (data) => {
    const locationName = data.location.name;
    const locationCountry = data.location.country;

    const location = `${locationName}, ${locationCountry}`;
    const temperature = data.current.temp_c;
    const conditionText = data.current.condition.text;
    const conditionIcon = data.current.condition.icon;
    const wind = data.current.wind_kph;
    const humidity = data.current.humidity;
    const precipitation = data.current.precip_mm;
    const lastUpdated = data.current.last_updated;

    return currentWeatherFactory(location, temperature, conditionText, conditionIcon, wind, humidity, precipitation, lastUpdated);
  };

  async function getAutocompleteOptions(currentInput) {
    const myAPIKey = APIKey.getAPIKey();
    const endpoint = buildRequestURL('search', myAPIKey, currentInput);
    try {
      const response = await fetch(endpoint, { mode: 'cors' });
      // if response body is empty just get through with it
      const data = getAutocompleteLocations(await response.json());
      return data;
    } catch (error) {
      return null;
    }
  }

  async function getCurrentWeatherData(location) {
    const myAPIKey = APIKey.getAPIKey();
    const endpoint = buildRequestURL('current', myAPIKey, location);
    try {
      const response = await fetch(endpoint, { mode: 'cors' });
      if (!response.ok) return null
      const data = convertDataToObject(await response.json());
      return data;
    } catch (error) {
      return null;
    }
  }

  return {
    getAutocompleteOptions,
    getCurrentWeatherData,
  };
})();

export default APIModule;
