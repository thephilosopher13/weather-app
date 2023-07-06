/*

1. Input.
1.1. Have an input that allows someone to put their location
1.1.2. Allow them to search/autocomplete with the Search or Autocomplete API on the location (make this also an async function that simply returns blank if no matches)
1.1.3. Put a submit button
2. Weather API 'get'
2.1. On 'submit' get the submitted location
2.2. Look for a match with the API's list of locations (allow wrong capitalizations here, e.g. manila, Manila or MANILA for Manila, Philippines)
2.3. Make the above an async function!
2.4. have an error handler
2.5. if response, proceed to step 3
2.6. Have a resetter here in case there's info already in the display info
3. Display info.
3.1. There's a bunch of info in the API so process info, like weather conditions, date and temp in a list
3.2. Put it in a display.
3.3.

*/

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

    return button;
  };

  const locationValueGetter = () => {
    const input = document.getElementById('weather-in-location');
    const location = input.value;

    return location;
  };

  const formSubmitHandler = (form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      form.reset();
    });
  };

  const createWeatherLocationForm = () => {
    const form = document.createElement('form');
    const input = createInputDiv();
    const submitButton = createSubmitButton();

    form.setAttribute('id', 'location-form');

    appendElements(form, input, submitButton);

    // put the eventListener for submit somewhere here

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
