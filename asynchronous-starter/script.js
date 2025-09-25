'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

// NEW COUNTRIES API URL (use instead of the URL shown in videos):
// https://restcountries.com/v2/name/portugal

// NEW REVERSE GEOCODING API URL (use instead of the URL shown in videos):
// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}

///////////////////////////////////////
// xmlhttprequest - old school way
const getCountryData = function (countryName) {
  const request = new XMLHttpRequest();

  request.open(`GET`, `https://restcountries.com/v3.1/name/${countryName}`);
  request.send();

  request.addEventListener(`load`, function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    const html = `
    <article class="country">
          <img class="country__img" src="${data.flags.png}" />
          <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1_000_000
            ).toFixed(1)}M people</p>
            <p class="country__row"><span>🗣️</span>${data.languages.eng}</p>
            <p class="country__row"><span>💰</span>${[
              data.currencies[Object.keys(data.currencies)[0]].name,
            ]}</p>
          </div>
        </article>
  `;

    countriesContainer.insertAdjacentHTML(`beforeend`, html);
    countriesContainer.style.opacity = `1`;
  });
};

getCountryData(`nigeria`);
getCountryData(`usa`);
getCountryData(`germany`);
