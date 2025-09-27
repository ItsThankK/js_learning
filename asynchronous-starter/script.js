'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderError = function (msg) {
  countriesContainer.insertAdjacentText(`beforeend`, msg);
};

// NEW COUNTRIES API URL (use instead of the URL shown in videos):
// https://restcountries.com/v2/name/portugal

// NEW REVERSE GEOCODING API URL (use instead of the URL shown in videos):
// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}

///////////////////////////////////////
// xmlhttprequest - old school way
/*
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
*/

// callback hell
const renderCountry = function (data, className = ``) {
  const html = `
    <article class="country ${className}">
          <img class="country__img" src="${data.flags.png}" />
          <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1_000_000
            ).toFixed(1)}M people</p>
            <p class="country__row"><span>🗣️</span>${
              Object.values(data.languages)[0]
            }</p>
            <p class="country__row"><span>💰</span>${[
              data.currencies[Object.keys(data.currencies)[0]].name,
            ]}</p>
          </div>
        </article>
  `;

  countriesContainer.insertAdjacentHTML(`beforeend`, html);
};
/*
const getCountryNeighbour = function (countryName) {
  // AJAX call country 1
  const request = new XMLHttpRequest();
  request.open(`GET`, `https://restcountries.com/v3.1/name/${countryName}`);
  request.send();

  request.addEventListener(`load`, function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    // Render country
    renderCountry(data);

    // Get neighbour country (2)
    const [neighbour] = data.borders;
    if (!neighbour) return;

    // AJAX call country 2
    const request2 = new XMLHttpRequest();
    request2.open(`GET`, `https://restcountries.com/v3.1/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener(`load`, function () {
      const [data2] = JSON.parse(this.responseText);
      console.log(data2);

      renderCountry(data2, `neighbour`);
    });
  });
};

// getCountryNeighbour(`nigeria`);
// getCountryNeighbour(`usa`);
getCountryNeighbour(`germany`);
*/

// promises and the fetch api
// Old way //
// const request = new XMLHttpRequest();
// request.open(`GET`, `https://restcountries.com/v3.1/name/${countryName}`);
// request.send();

// New way //
// const request = fetch(`https://restcountries.com/v3.1/name/nigeria`);
// console.log(request);

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(function (response) {
//       console.log(response);

//       return response.json();
//     })
//     .then(function (data) {
//       console.log(...data);
//       renderCountry(...data)
//     });
// };

const getJSON = function (url, errorMessage = `Something went wrong`) {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMessage} (${response.status})`);
    return response.json();
  });
};

const getCountryData = function (country) {
  getJSON(`https://restcountries.com/v3.1/name/${country}`, `Country not found`)
    .then(data => {
      // country 1
      renderCountry(data[0]);

      const neighbour = data[0].borders[1];
      if (!neighbour) throw new Error(`No neighbour found`);
      // country 2
      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbour}`,
        `Country not found`
      );
    })
    .then(data => renderCountry(data[0], `neighbour`))
    .catch(err => {
      console.error(`%c${err} ❌`, `color: blue;`);
      renderError(`${err} ❌`);
    })
    .finally(() => {
      countriesContainer.style.opacity = `1`;
    });
};

btn.addEventListener(`click`, function () {
  getCountryData(`nigeria`);
});

// the event loop in practice
// console.log(`Test start`);
// setTimeout(() => {
//   console.log(`0 sec timer`);
// }, 0);
// Promise.resolve(`Resolved promise 1`).then(res => console.log(res));
// Promise.resolve(`Resolved promise 2`).then(res => {
//   for (let i = 0; i < 1000000000; i++) {}
//   console.log(res);
// });
// console.log(`Test end`);

// building a simple promise
// const lotteryPromise = new Promise(function (resolve, reject) {
//   console.log(`Lottery draw is happening 🔮`);
//   setTimeout(() => {
//     if (Math.random() >= 0.5) {
//       resolve(`You WIN 💲`);
//     } else reject(new Error(`You LOST your money 🤡`));
//   }, 2000);
// });

// lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// Promisifying setTimeout
// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };
// wait(5)
//   .then(() => {
//     console.log(`I waited for 2 seconds`);
//     return wait(1);
//   })
//   .then(() => console.log(`I waited for 1 second`));

// Promisifying the geolocation api
// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     // navigator.geolocation.getCurrentPosition(
//     //   position => resolve(position),
//     //   err => reject(err)
//     // );
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// getPosition()
//   .then(response => console.log(response))
//   .catch(err => console.log(err));

// asyn/ await
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function () {
  try {
    const position = await getPosition();
    const { latitude: lat, longitude: lng } = position.coords;

    const myCountry = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
    );
    if (!myCountry.ok) throw new Error('Problem getting location');
    const country = await myCountry.json();

    const res = await fetch(
      `https://restcountries.com/v3.1/name/${country.countryName}`
    );
    if (!res.ok) throw new Error('Problem getting country');

    const [data] = await res.json();
    renderCountry(data);
  } catch (err) {
    console.error(new Error(`Something went wrong ${err.message}`));
  }
};
whereAmI();

// // try...catch
// try {
//   let y = 1;
//   const x = 2;
//   x = 3;
// } catch (err) {
//   console.error(err.message);
// }

/*
// CHALLNEGE 1
const whereAmI = function (lat, lng) {
  fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
  )
    .then(response => {
      if (!response.ok)
        throw new Error(
          `Country not found in this coordinates (${response.status})`
        );
      return response.json();
    })
    .then(data => {
      console.log(`You are in ${data.countryName}`);
      getCountryData(data.countryName);
    })
    .catch(err => console.log(err));
};

btn.addEventListener(`click`, function () {
  whereAmI(`6.5480551`, `3.239596`);
});

/*
`6.5480551`, `3.239596`
`52.508`, `13.381`
`19.037`, `72.873` 
`-33.933`, `18.474`
*/

// CHALLENGE 2
/*
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve(console.log(`Finished waiting`)), seconds * 1000);
  });
};

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.setAttribute(`src`, imgPath);

    img.addEventListener(`load`, function () {
      document.querySelector(`.images`).append(img);

      resolve(img);
    });

    img.addEventListener(`error`, function () {
      reject(new Error(`Image failed to load`));
    });
  });
};

let currentImg;

createImage(`img/img-1.jpg`)
  .then(res => {
    currentImg = res;
    console.log(res);
    return wait(5);
  })
  .then(() => {
    currentImg.style.display = `none`;
    return createImage(`img/img-2.jpg`);
  })
  .then(res => { 
    currentImg = res;
    console.log(res);
    return wait(5);
  })
  .then(() => {
    currentImg.style.display = `none`;
  })
  .catch(err => console.error(err));
*/
