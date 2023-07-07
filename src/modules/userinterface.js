import APIModule from './apifunctions';

const DOMManipulation = (() => {
  const inputFactory = document.createElement('input');
  const divFactory = document.createElement('div');

  const appendElements = (parentElement, ...childrenElements) => {
    childrenElements.forEach((childElement) => {
      parentElement.appendChild(childElement);
    });
  };

  const createWeatherInputLabel = () => {
    const label = document.createElement('label');
    label.setAttribute('for', 'weather-in-location');
    label.textContent = 'Location: ';

    return label;
  };

  const createWeatherInput = () => {
    const input = inputFactory.cloneNode();

    input.setAttribute('type', 'text');
    input.id = 'weather-in-location';
    input.setAttribute('name', 'location');

    return input;
  };

  const createInputDiv = () => {
    const inputDiv = divFactory.cloneNode();
    const inputLabel = createWeatherInputLabel();
    const inputBox = createWeatherInput();

    appendElements(inputDiv, inputLabel, inputBox);

    return inputDiv;
  };

  const createSubmitButton = () => {
    const button = inputFactory.cloneNode();
    button.type = 'Submit';
    button.value = 'Submit';
    button.style.cursor = 'pointer';

    return button;
  };

  const locationValueGetter = () => {
    const input = document.getElementById('weather-in-location');
    const location = input.value;

    return location;
  };

  const locationNotFoundDivMaker = () => {
    const div = divFactory.cloneNode();
    div.classList.add('not-found-error');
    div.textContent = 'Location not found.';

    return div;
  };

  const createSuggestionsDiv = () => {
    const suggestionListDiv = divFactory.cloneNode();
    suggestionListDiv.id = 'autocomplete';

    return suggestionListDiv;
  };

  const outputDivMaker = (object) => {
    const locationDiv = divFactory.cloneNode();
    const temperatureDiv = divFactory.cloneNode();
    const conditionIconImg = document.createElement('img');
    const conditionDiv = divFactory.cloneNode();
    const windDiv = divFactory.cloneNode();
    const humidityDiv = divFactory.cloneNode();
    const precipitationDiv = divFactory.cloneNode();
    const lastUpdatedDiv = divFactory.cloneNode();
    const outputDiv = divFactory.cloneNode();

    locationDiv.classList.add('current-location');
    temperatureDiv.classList.add('temperature');
    conditionDiv.classList.add('condition-icon');
    windDiv.classList.add('wind');
    humidityDiv.classList.add('humidity');
    precipitationDiv.classList.add('precipitation');
    lastUpdatedDiv.classList.add('last-updated');
    outputDiv.classList.add('output');

    locationDiv.textContent = object.location;
    temperatureDiv.textContent = `${object.temperature}°C`;
    conditionIconImg.setAttribute('src', object.conditionIcon);
    windDiv.textContent = `Wind: ${object.wind} kph`;
    humidityDiv.textContent = `Humidity: ${object.humidity}%`;
    precipitationDiv.textContent = `Precipitation: ${object.precipitation} mm`;
    lastUpdatedDiv.textContent = `Last Updated: ${object.lastUpdated}`;
    conditionDiv.appendChild(conditionIconImg);

    // eslint-disable-next-line max-len
    appendElements(outputDiv, locationDiv, temperatureDiv, conditionDiv, windDiv, humidityDiv, precipitationDiv, lastUpdatedDiv);

    return outputDiv;
  };

  const locationOutput = async () => {
    const location = locationValueGetter();
    const dataOutput = await APIModule.getCurrentWeatherData(location);

    if (dataOutput === null) {
      return locationNotFoundDivMaker();
    // eslint-disable-next-line no-else-return
    } else {
      return outputDivMaker(dataOutput);
    }
  };

  const addFormSubmitHandler = (form) => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const outputDiv = await locationOutput();
      const content = document.getElementById('content');

      content.innerHTML = '';
      content.appendChild(outputDiv);

      form.reset();
    });
  };

  const closeList = () => {
    const suggestions = document.getElementById('autocomplete');
    if (suggestions) suggestions.parentNode.removeChild(suggestions);
  };

  const addInputSuggestionsHandler = (input) => {
    input.addEventListener('input', async () => {
      const currentInput = locationValueGetter();
      const suggestionArray = await APIModule.getAutocompleteOptions(currentInput);
      closeList();

      if (suggestionArray === null) {
        return;
      }

      const suggestionsDiv = createSuggestionsDiv();
      input.appendChild(suggestionsDiv);

      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < suggestionArray.length; i++) {
        const suggestion = divFactory.cloneNode();
        suggestion.textContent = suggestionArray[i];
        suggestion.addEventListener('click', () => {
          const locationInput = document.getElementById('weather-in-location');
          locationInput.value = suggestion.textContent;
          closeList();
        });
        suggestion.style.cursor = 'pointer';
        suggestionsDiv.appendChild(suggestion);
      }
    });
  };

  const createWeatherLocationForm = () => {
    const form = document.createElement('form');
    const input = createInputDiv();
    const submitButton = createSubmitButton();

    form.setAttribute('id', 'location-form');

    appendElements(form, input, submitButton);

    addInputSuggestionsHandler(input);
    addFormSubmitHandler(form);

    return form;
  };

  const createAppName = () => {
    const appName = document.createElement('h1');

    appName.id = 'app-name';
    appName.textContent = 'Weather App';

    return appName;
  };

  const createFooter = () => {
    const footer = document.createElement('footer');

    footer.textContent = 'Copyright © 2023 thephilosopher13 Image taken from unsplash, WeatherAPI used in website.';

    return footer;
  };

  const createContentDiv = () => {
    const content = divFactory.cloneNode();

    content.id = 'content';

    return content;
  };

  const createHeader = () => {
    const header = document.createElement('header');
    const appName = createAppName();
    const locationForm = createWeatherLocationForm();

    appendElements(header, appName, locationForm);

    return header;
  };

  const loadPage = () => {
    const header = createHeader();
    const content = createContentDiv();
    const footer = createFooter();
    const { body } = document;

    appendElements(body, header, content, footer);
  };

  return {
    loadPage,
  };
})();

const init = () => {
  DOMManipulation.loadPage();
};

export default init;
