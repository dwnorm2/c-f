const urlF =
  "https://api.open-meteo.com/v1/forecast?latitude=42.37614837272497&longitude=-87.88646801151233&current_weather=true&temperature_unit=fahrenheit";

const urlC =
  "https://api.open-meteo.com/v1/forecast?latitude=42.37614837272497&longitude=-87.88646801151233&current_weather=true";

function searchF() {
  fetch(urlF)
    .then((red) => red.json())
    .then((data) => {
      // console.log(data.current_weather.temperature);
      getFTemps(data);
    })
    .then((data) => {})
    .catch((err) => {
      console.log(`error ${err}`);
    });
}

function searchC() {
  fetch(urlC)
    .then((red) => red.json())
    .then((data) => {
      getCTemps(data);
    })
    .then((data) => {})
    .catch((err) => {
      console.log(`error ${err}`);
    });
}

function getFTemps(data) {
  let fTemp = data.current_weather.temperature;
  console.log(fTemp);
  document.getElementById(`f`).textContent = fTemp;
}

function getCTemps(data) {
  let cTemp = data.current_weather.temperature;
  console.log(cTemp);
  document.getElementById(`c`).textContent = cTemp;
}

searchF();
searchC();
