const url =
  "https://api.open-meteo.com/v1/forecast?latitude=42.37614837272497&longitude=-87.88646801151233&hourly=temperature_2m&temperature_unit=fahrenheit&precipitation_unit=inch&timezone=America%2FChicago&forecast_days=3";

function search() {
  fetch(url)
    .then((red) => red.json())
    .then((data) => {
      // console.log(data);
      updateDayLabels(data);
      getTemps(data);
    })
    .then((data) => {})
    .catch((err) => {
      console.log(`error ${err}`);
    });
}

function updateDayLabels(data) {
  document.getElementById("day1").textContent =
    data.hourly.time[0].slice(5, -6) + ":";

  document.getElementById("day2").textContent =
    data.hourly.time[24].slice(5, -6) + ":";

  document.getElementById("day3").textContent =
    data.hourly.time[48].slice(5, -6) + ":";
}

function getTemps(data) {
  console.log(data.hourly.temperature_2m);
  let temps = data.hourly.temperature_2m;
  let day1Temps = temps.slice(0, 8);
  let day2Temps = temps.slice(24, 32);
  let day3Temps = temps.slice(48, 56);
  console.log(day1Temps);
  getAvgTemps(day1Temps, day2Temps, day3Temps);
}

function getAvgTemps(day1Temps, day2Temps, day3Temps) {
  let day1Avg = day1Temps.reduce(
    (total, x, i, arr) => total + x / arr.length,
    0
  );
  console.log(day1Avg);
  let day2Avg = day2Temps.reduce(
    (total, x, i, arr) => total + x / arr.length,
    0
  );
  let day3Avg = day3Temps.reduce(
    (total, x, i, arr) => total + x / arr.length,
    0
  );

  getIdealHumidity(day1Avg, day2Avg, day3Avg);
}

function getIdealHumidity(day1Avg, day2Avg, day3Avg) {
  let day1IdealHumidity = calculateHumidity(day1Avg);
  let day2IdealHumidity = calculateHumidity(day2Avg);
  let day3IdealHumidity = calculateHumidity(day3Avg);

  updateUI(day1IdealHumidity, day2IdealHumidity, day3IdealHumidity);
}

function calculateHumidity(avgTemp) {
  return Math.round(avgTemp * 0.5 + 25);
}

function updateUI(day1IdealHumidity, day2IdealHumidity, day3IdealHumidity) {
  document.getElementById(`day1Humidity`).textContent = day1IdealHumidity + "%";
  document.getElementById(`day2Humidity`).textContent = day2IdealHumidity + "%";
  document.getElementById(`day3Humidity`).textContent = day3IdealHumidity + "%";
}

search();
