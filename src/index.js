import "./styles.css";

const API_KEY = "778HZLBHN87PK4NGY7TMH9LHH";
const locationInput = document.getElementById("location");
const locationForm = document.querySelector(".search-grid form");
const tempUnitButton = document.querySelector(".unit-button");
const tempUnitText = document.querySelector(".temp-text p");
let tempUnit = "Fahrenheit";
let location;

let weatherIcons = {
  rain: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#e3e3e3"><path d="M558-84q-15 8-30.5 2.5T504-102l-60-120q-8-15-2.5-30.5T462-276q15-8 30.5-2.5T516-258l60 120q8 15 2.5 30.5T558-84Zm240 0q-15 8-30.5 2.5T744-102l-60-120q-8-15-2.5-30.5T702-276q15-8 30.5-2.5T756-258l60 120q8 15 2.5 30.5T798-84Zm-480 0q-15 8-30.5 2.5T264-102l-60-120q-8-15-2.5-30.5T222-276q15-8 30.5-2.5T276-258l60 120q8 15 2.5 30.5T318-84Zm-18-236q-91 0-155.5-64.5T80-540q0-83 55-145t136-73q32-57 87.5-89.5T480-880q90 0 156.5 57.5T717-679q69 6 116 57t47 122q0 75-52.5 127.5T700-320H300Zm0-80h400q42 0 71-29t29-71q0-42-29-71t-71-29h-60v-40q0-66-47-113t-113-47q-48 0-87.5 26T333-704l-10 24h-25q-57 2-97.5 42.5T160-540q0 58 41 99t99 41Zm180-200Z"/></svg>',
  snow: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#e3e3e3"><path d="M260-200q-21 0-35.5-14.5T210-250q0-21 14.5-35.5T260-300q21 0 35.5 14.5T310-250q0 21-14.5 35.5T260-200ZM380-80q-21 0-35.5-14.5T330-130q0-21 14.5-35.5T380-180q21 0 35.5 14.5T430-130q0 21-14.5 35.5T380-80Zm120-120q-21 0-35.5-14.5T450-250q0-21 14.5-35.5T500-300q21 0 35.5 14.5T550-250q0 21-14.5 35.5T500-200Zm240 0q-21 0-35.5-14.5T690-250q0-21 14.5-35.5T740-300q21 0 35.5 14.5T790-250q0 21-14.5 35.5T740-200ZM620-80q-21 0-35.5-14.5T570-130q0-21 14.5-35.5T620-180q21 0 35.5 14.5T670-130q0 21-14.5 35.5T620-80ZM300-360q-91 0-155.5-64.5T80-580q0-83 55-145t136-73q32-57 87.5-89.5T480-920q90 0 156.5 57.5T717-719q69 6 116 57t47 122q0 75-52.5 127.5T700-360H300Zm0-80h400q42 0 71-29t29-71q0-42-29-71t-71-29h-60v-40q0-66-47-113t-113-47q-48 0-87.5 26T333-744l-10 24h-25q-57 2-97.5 42.5T160-580q0 58 41 99t99 41Zm180-100Z"/></svg>',
  cloudy:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#e3e3e3"><path d="M260-160q-91 0-155.5-63T40-377q0-78 47-139t123-78q25-92 100-149t170-57q117 0 198.5 81.5T760-520q69 8 114.5 59.5T920-340q0 75-52.5 127.5T740-160H260Zm0-80h480q42 0 71-29t29-71q0-42-29-71t-71-29h-60v-80q0-83-58.5-141.5T480-720q-83 0-141.5 58.5T280-520h-20q-58 0-99 41t-41 99q0 58 41 99t99 41Zm220-240Z"/></svg>',
  clearday:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#e3e3e3"><path d="M440-760v-160h80v160h-80Zm266 110-55-55 112-115 56 57-113 113Zm54 210v-80h160v80H760ZM440-40v-160h80v160h-80ZM254-652 140-763l57-56 113 113-56 54Zm508 512L651-255l54-54 114 110-57 59ZM40-440v-80h160v80H40Zm157 300-56-57 112-112 29 27 29 28-114 114Zm283-100q-100 0-170-70t-70-170q0-100 70-170t170-70q100 0 170 70t70 170q0 100-70 170t-170 70Zm0-80q66 0 113-47t47-113q0-66-47-113t-113-47q-66 0-113 47t-47 113q0 66 47 113t113 47Zm0-160Z"/></svg>',
  clearnight:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#e3e3e3"><path d="M600-640 480-760l120-120 120 120-120 120Zm200 120-80-80 80-80 80 80-80 80ZM483-80q-84 0-157.5-32t-128-86.5Q143-253 111-326.5T79-484q0-146 93-257.5T409-880q-18 99 11 193.5T520-521q71 71 165.5 100T879-410q-26 144-138 237T483-80Zm0-80q88 0 163-44t118-121q-86-8-163-43.5T463-465q-61-61-97-138t-43-163q-77 43-120.5 118.5T159-484q0 135 94.5 229.5T483-160Zm-20-305Z"/></svg>',
  partlycloudyday:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#e3e3e3"><path d="M440-760v-160h80v160h-80Zm266 110-56-56 113-114 56 57-113 113Zm54 210v-80h160v80H760Zm3 299L650-254l56-56 114 112-57 57ZM254-650 141-763l57-57 112 114-56 56Zm-14 450h180q25 0 42.5-17.5T480-260q0-25-17-42.5T421-320h-51l-20-48q-14-33-44-52.5T240-440q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T40-320q0-83 58.5-141.5T240-520q60 0 109.5 32.5T423-400q58 0 97.5 43T560-254q-2 57-42.5 95.5T420-120H240Zm320-134q-5-20-10-39t-10-39q45-19 72.5-59t27.5-89q0-66-47-113t-113-47q-60 0-105 39t-53 99q-20-5-41-9t-41-9q14-88 82.5-144T480-720q100 0 170 70t70 170q0 77-44 138.5T560-254Zm-79-226Z"/></svg>',
  partlycloudynight:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#e3e3e3"><path d="M504-425Zm20 385H420l20-12.5q20-12.5 43.5-28t43.5-28l20-12.5q81-6 149.5-49T805-285q-86-8-163-43.5T504-425q-61-61-97-138t-43-163q-77 43-120.5 118.5T200-444v12l-12 5.5q-12 5.5-26.5 11.5T135-403.5l-12 5.5q-2-11-2.5-23t-.5-23q0-146 93-257.5T450-840q-18 99 11 193.5T561-481q71 71 165.5 100T920-370q-26 144-138 237T524-40Zm-284-80h180q25 0 42.5-17.5T480-180q0-25-17-42.5T422-240h-52l-20-48q-14-33-44-52.5T240-360q-50 0-85 34.5T120-240q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T40-240q0-83 58.5-141.5T240-440q60 0 109.5 32.5T423-320q57 2 97 42.5t40 97.5q0 58-41 99t-99 41H240Z"/></svg>',
  fog: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#e3e3e3"><path d="M720-200q-17 0-28.5-11.5T680-240q0-17 11.5-28.5T720-280q17 0 28.5 11.5T760-240q0 17-11.5 28.5T720-200ZM280-80q-17 0-28.5-11.5T240-120q0-17 11.5-28.5T280-160q17 0 28.5 11.5T320-120q0 17-11.5 28.5T280-80Zm-40-120q-17 0-28.5-11.5T200-240q0-17 11.5-28.5T240-280h360q17 0 28.5 11.5T640-240q0 17-11.5 28.5T600-200H240ZM400-80q-17 0-28.5-11.5T360-120q0-17 11.5-28.5T400-160h280q17 0 28.5 11.5T720-120q0 17-11.5 28.5T680-80H400ZM300-320q-91 0-155.5-64.5T80-540q0-83 55-145t136-73q32-57 87.5-89.5T480-880q90 0 156.5 57.5T717-679q69 6 116 57t47 122q0 75-52.5 127.5T700-320H300Zm0-80h400q42 0 71-29t29-71q0-42-29-71t-71-29h-60v-40q0-66-47-113t-113-47q-48 0-87.5 26T333-704l-10 24h-25q-57 2-97.5 42.5T160-540q0 58 41 99t99 41Zm180-200Z"/></svg>',
  wind: '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M460-160q-50 0-85-35t-35-85h80q0 17 11.5 28.5T460-240q17 0 28.5-11.5T500-280q0-17-11.5-28.5T460-320H80v-80h380q50 0 85 35t35 85q0 50-35 85t-85 35ZM80-560v-80h540q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43h-80q0-59 40.5-99.5T620-840q59 0 99.5 40.5T760-700q0 59-40.5 99.5T620-560H80Zm660 320v-80q26 0 43-17t17-43q0-26-17-43t-43-17H80v-80h660q59 0 99.5 40.5T880-380q0 59-40.5 99.5T740-240Z"/></svg>',
};

// Location Text

function populateLocationText(response) {
  const locationTextMain = document.querySelector(".location-text h1");
  const locationTextSecondary = document.querySelector(".location-text h3");
  let splitText = response.resolvedAddress.split(", ");
  console.log(splitText);
  locationTextMain.textContent = splitText[0];
  console.log("good!");
  if (splitText[2]) {
    locationTextSecondary.textContent = `${splitText[1]}, ${splitText[2]}`;
  } else if (splitText[1]) {
    locationTextSecondary.textContent = splitText[1];
  } else {
    locationTextSecondary.textContent = "";
  }
}

// Current Data

function populateDayData(response) {
  const tempText = document.querySelector(".temp-text h1");
  const lowText = document.querySelector(".low");
  const highText = document.querySelector(".high");
  const conditionsText = document.querySelector(".conditions");
  const humidityStatText = document.querySelector(".humid-stat");
  const uvIndexStatText = document.querySelector(".uv-stat");
  const precipitationStatText = document.querySelector(".precipitation h3");

  let today = response.days[0];
  tempText.textContent = `${today.temp}°`;
  lowText.textContent = `L:${today.tempmin}°`;
  highText.textContent = `H:${today.tempmax}°`;
  conditionsText.textContent = today.conditions;
  humidityStatText.textContent = today.humidity + "%";
  uvIndexStatText.textContent = today.uvindex;
  if (tempUnit == "Fahrenheit") {
    precipitationStatText.textContent = today.precip + '"';
  } else if (tempUnit == "Celcius") {
    precipitationStatText.textContent = today.precip + "mm";
  }
}

function populateHourData(response) {
  const hourTempText = document.querySelectorAll(".hour-temp");
  const hourIcons = document.querySelectorAll(".weather-icon-hour");
  const hourData = response.days[0].hours;
  for (let i = 0; i < 24; i++) {
    hourTempText[i].textContent = hourData[i].temp + "°";
    hourIcons[i].innerHTML = weatherIcons[hourData[i].icon.split("-").join("")];
  }
}

function populateWeekData(response) {
  const dateText = document.querySelectorAll(".date-text");
  const dayIcons = document.querySelectorAll(".weather-icon-day");
  const dayTempText = document.querySelectorAll(".day-temp-text");
  const weekData = response.days;
  const lowTempText = document.querySelectorAll(".forecast-day .low");
  const highTempText = document.querySelectorAll(".forecast-day .high");

  for (let i = 0; i < 7; i++) {
    dateText[i].textContent = weekData[i + 1].datetime
      .split("-")
      .slice(1, 3)
      .join("/");
    dayIcons[i].innerHTML =
      weatherIcons[weekData[i + 1].icon.split("-").join("")];
    dayTempText[i].textContent = weekData[i + 1].temp + "°";
    lowTempText[i].textContent = `L:${weekData[i + 1].tempmin}°`;
    highTempText[i].textContent = `H:${weekData[i + 1].tempmax}°`;
  }
}

function populateData(response) {
  populateLocationText(response);
  populateDayData(response);
  populateHourData(response);
  populateWeekData(response);
}

function fetchDataFahrenheit(search) {
  fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${search}?key=${API_KEY}`,
    { mode: "cors" }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      } else {
        return response.json();
      }
    })
    .then((response) => {
      console.log(response);
      console.log(response.resolvedAddress);
      populateData(response);
    })
    .catch((error) => {});
}

function fetchDataCelcius(search) {
  fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${search}?unitGroup=metric&key=${API_KEY}`,
    { mode: "cors" }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      } else {
        return response.json();
      }
    })
    .then((response) => {
      console.log(response);
      console.log(response.resolvedAddress);
      populateData(response);
    })
    .catch((error) => {});
}

locationForm.addEventListener("submit", (event) => {
  event.preventDefault();
  location = locationInput.value;
  if (tempUnit == "Fahrenheit") {
    fetchDataFahrenheit(location);
  } else if (tempUnit == "Celcius") {
    fetchDataCelcius(location);
  }
});

tempUnitButton.addEventListener("click", () => {  
  if (tempUnit == "Fahrenheit") {
    tempUnit = "Celcius";
    fetchDataCelcius(location);
  } else {
    tempUnit = "Fahrenheit";
    fetchDataFahrenheit(location);
  }
  tempUnitText.textContent = tempUnit;
});

// On Start

fetchDataFahrenheit("New York");
location = "New York";
