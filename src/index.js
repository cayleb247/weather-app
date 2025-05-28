import "./styles.css";

const API_KEY = "778HZLBHN87PK4NGY7TMH9LHH";
const locationInput = document.getElementById("location");
const locationForm = document.querySelector(".search-grid form");
const tempUnitButton = document.querySelector(".unit-button");

// City Name
const locationTextMain = document.querySelector(".location-text h1");
const locationTextSecondary = document.querySelector(".location-text h3");

function populateLocationText(text) {
    let splitText = text.split(", ");
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

locationForm.addEventListener("submit", (event) => {
  event.preventDefault();
  fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationInput.value}?key=${API_KEY}`,
    { mode: "cors" }
  ).then((response) => {
    return response.json();
  }).then((response) => {
    console.log(response);
    console.log(response.resolvedAddress);
    populateLocationText(response.resolvedAddress);
  }).catch((err) => {
    console.log(err);
  })
});

tempUnitButton.addEventListener("click", () => {});
