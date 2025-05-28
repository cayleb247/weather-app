import "./styles.css";

const API_KEY = "778HZLBHN87PK4NGY7TMH9LHH";
const locationInput = document.getElementById("location");
const locationForm = document.querySelector(".search-grid form");
const tempUnitButton = document.querySelector(".unit-button");
let tempUnit = "Fahrenheit";

let weatherIcons = {

}

// Location Text

function populateLocationText(response) {
    const locationTextMain = document.querySelector(".location-text h1");
    const locationTextSecondary = document.querySelector(".location-text h3");
    let splitText = response.resolvedAddress.split(", ");
    console.log(splitText);
    locationTextMain.textContent = splitText[0];
    console.log("good!");
    if (splitText[2]) {
        locationTextSecondary.textContent = `${splitText[1]}, ${splitText[2]}`
    } else if (splitText[1]) {
        locationTextSecondary.textContent = splitText[1];
    } else {
        locationTextSecondary.textContent = '';
    }
}

// Current Data

function populateDayData(response) {
    const tempText = document.querySelector(".temp-text h1");
    const lowText = document.querySelector(".low");
    const highText = document.querySelector(".high");
    const conditionsText = document.querySelector(".conditions")

    let today = response.days[0];
    tempText.textContent = `${today.temp}°`;
    lowText.textContent = `L:${today.tempmin}°`;
    highText.textContent = `H:${today.tempmax}°`;
    conditionsText.textContent = today.conditions;
    console.log(today);
}

function populateHourData(response) {
    const hourTempText = document.querySelectorAll(".hour-temp");
    const hourData = response.days[0].hours;
    for (let i=0; i<24; i++) {
        hourTempText[i].textContent = hourData[i].temp;
    }
}

function displayError() {

}

function populateData(response) {
    populateLocationText(response);
    populateDayData(response);
    populateHourData(response);
}

locationForm.addEventListener("submit", (event) => {
  event.preventDefault();
  fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationInput.value}?key=${API_KEY}`,
    { mode: "cors" }
  ).then((response) => {
    if (!response.ok) {
      throw new Error;
    } else {
        return response.json();
    }
  }).then((response) => {
    console.log(response);
    console.log(response.resolvedAddress);
    populateData(response);
  }).catch((error) => {
    console.log("location not found.")
    // displayError();
  })
});

tempUnitButton.addEventListener("click", () => {});
