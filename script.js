"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

///////////////////////////////////////

const renderCountry = function (data, className = "") {
  const { currencies, languages } = data;

  const lang = [...Object.entries(languages)[0]];
  console.log(lang);
  const curName = [...Object.entries(currencies)[0]][0];
  console.log(curName);

  const html = `
    <article class="country ${className}">
      <img class="country__img" src="${data.flags.svg}" />
      <div class="country__data">
        <h3 class="country__name">${data.name.common}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><languagesan>${(
          +data.population / 1000000
        ).toFixed(1)} people</p>
        <p class="country__row"><span>🗣️</span>${lang}</p>
        <p class="country__row"><span>💰</span>${curName}</p>
      </div>
    </article>
    `;

  countriesContainer.insertAdjacentHTML("beforeend", html);
  countriesContainer.style.opacity = "1";
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText("beforeend", msg);
  countriesContainer.style.opacity = 1;
};

const getJSON = function (url, errorMsg = "Something went wrong") {
  return fetch(url).then((response) => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};

/* 

const getCountryData = function (country) {
    //country 1
  fetch(`https://restcountries.com/v3.1/name/${country}`) // fetch the data from the server
    .then( (response) => {

        console.log(response.ok);
       
        if(!response.ok) 
        throw new Error(`country not found: ${country} response: ${response.status}`);

       return response.json()
    }) // convert to json
    .then( (data) => {
        
        renderCountry(data[0])// use the data
        const neighbour = data[0]?.borders?.[0]
        if(!neighbour) return;
        

        //country 2
      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`)
    })
    .then(response => response.json())
    .then(data => renderCountry(data[0], 'neighbour'))
    // global catch error
    .catch(err =>  {
        console.log('ERROR');
        renderError(`something went wrong 😕 ${err}`);

    })
    .finally(() => {
    countriesContainer.style.opacity = "1";
        
    })
    

};

 */

/*
const getCountryData = function (country) {
  //country 1

  getJSON(`https://restcountries.com/v3.1/name/${country}`, "country not found")
    .then((data) => {
      renderCountry(data[0]); // use the data
      const neighbour = data[0]?.borders?.[0];
      if (!neighbour) throw new Error(`neighbour not found`);

      //country 2
      return getJSON(`https://restcountries.com/v3.1/alpha/${neighbour}`);
    })
    .then((data) => renderCountry(data[0], "neighbour"))
    // global catch error
    .catch((err) => {
      console.log("ERROR");
      renderError(`something went wrong 😕 ${err}`);
    })
    .finally(() => {
      countriesContainer.style.opacity = "1";
    });
};

btn.addEventListener("click", () => {
  getCountryData("japan");
});

*/

/*

const whereIm = function (lat, lng) {
    fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    .then(response => {

        if(!response) throw new Error('input not valid');

        console.log(response)
        return response.json();
    })
    .then((data) => {
        console.log(` you are in ${data.country}, ${data.city}`);

        return data.country;
    })
    .then(data => getJSON(`https://restcountries.com/v3.1/name/${data}`))
    .then(data => {

        console.log(data[0]);
        console.log(data[0].name.common);
        renderCountry(data[0]);
        

    })
    .catch((err) => {
        console.log(`not found ${err}`);
    })
    .finally( () => {
        countriesContainer.style.opacity = "1";
    }   
    )


};

// whereIm('52.508','13.381');
//whereIm('19.037','72.873');
 whereIm('-33.933','18.474');



const lotteryPromise =  new Promise( function (resolve, reject) {
    console.log('lotter draw is happening');

    setTimeout(() => {

        if(Math.random () >= 0.5){
            resolve(`You WIN 🎉`);
        
        } else {
            reject(new Error( `You lose 💩`));
        }

    }, 2000)
});

lotteryPromise.then(res => console.log(res)).catch((err) => console.error(err));



const wait = (sec) => {
    return new Promise(resolve => {

        setTimeout(resolve, sec * 1000);
    });

}

wait(3).then(() => {
    console.log('i waited 3 seconds')
    return wait(10);
}).then(() => console.log('i waited 10 sec'));

*/

/*
const getPosition = function() {
    return new Promise((resolve, reject) => {

        navigator.geolocation.getCurrentPosition(resolve, reject);

    })
};


const whereIm = function () {

    getPosition().then(position => {

        console.log(position.coords);

        const { latitude: lat, longitude: lng} = position.coords;
        console.log(lat, lng)
        

        return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    })
    .then(response => {

        if(!response) throw new Error('input not valid');

        console.log(response)
        return response.json();
    })
    .then((data) => {
        console.log(` you are in ${data.country}, ${data.city}`);

        return data.country;
    })
    .then(data => getJSON(`https://restcountries.com/v3.1/name/${data}`))
    .then(data => {

      
        console.log(data[0]);
        
        renderCountry(data[0]);
        

    })
    .catch((err) => {
        console.log(`not found ${err}`);
    })
    .finally( () => {
        countriesContainer.style.opacity = "1";
    }   
    )

};

btn.addEventListener('click', whereIm);

*/
/*

function getPosition() {

  return new Promise ((resolve, reject) => {

    navigator.geolocation.getCurrentPosition(resolve, reject);

  })

}

const whereIm = function () {

  getPosition().then(position => {
    console.log(position.coords);

    const {latitude : lat, longitude: lng} = position.coords;
    console.log(lat, lng);

    return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
  })
  .then( response =>{
    if(!response) throw new Error (' input not vaild ');

    return response.json();
  })
  .then(data => {
    console.log(data.country);
    return data.country;
  })
  .then( country => getJSON(`https://restcountries.com/v3.1/name/${country}`))
  .then( data => {
    console.log(data[0]);

    renderCountry(data[0]);

  })
  .catch( error => console.log( 'fant ikke',  error ))
  .finally( () => {

    countriesContainer.style.opacity = "1";

  })
}

btn.addEventListener('click', whereIm);

*/

function createImage(url) {
  return new Promise((resolve, reject) => {});
}

const addAnimal = document.querySelector(".btn-animal");
const animalCards = document.createElement("div");

document.querySelector('body').append(animalCards);

const animals = [
  { name: "dog", img: "https://media.istockphoto.com/id/539150389/photo/winter-walk-of-golden-retriever-puppy.jpg?s=612x612&w=0&k=20&c=iZ06Vb4aKGbCgHWWnQzvgYyuuluhdHByN3gKPwvQrIo=" },
  { name: "cat", img: "https://media.istockphoto.com/id/1349426354/photo/young-cat-lying-under-christmas-tree.webp?b=1&s=170667a&w=0&k=20&c=z9Wv5Ua4ZzPa89OTJnlnWZYV6Ud77AnDkjA2yXFH1EE=" },
  { name: "elephant", img: "https://media.istockphoto.com/id/620379788/photo/african-elephant-and-the-ngorongoro-savanna-in-tanzania.webp?b=1&s=170667a&w=0&k=20&c=DGtLhqAYTMeepRTgi6chI0JmaEYD3A10uOUSkebSdOs=" },
  { name: "snake", img: "https://media.istockphoto.com/id/624626136/photo/grass-snake.webp?b=1&s=170667a&w=0&k=20&c=XOR9jYuLaFl1b1NKHQr4h4LyRE6FFfbMYonXEJ_aPF8=" },
  { name: "lion", img: "https://media.istockphoto.com/id/171136538/photo/male-lion-lying-on-concrete-floor-at-sunset-with-orange-wall.webp?b=1&s=170667a&w=0&k=20&c=DLloJoTKcR3seR2_3srVYX_e9v6nFqTzRc7jlYWcoRM=" },
  { name: "zebra", img: "https://media.istockphoto.com/id/1418803312/photo/mother-zebra-and-her-cub.webp?b=1&s=170667a&w=0&k=20&c=T3wH1wE-EW_CXIjKCCAt0o1I2cROcPYblojRBBANHGo=" },
  { name: "eagle", img: "https://media.istockphoto.com/id/168511255/photo/bald-eagle-gliding-against-blue-sky-and-white-wispy-clouds.webp?b=1&s=170667a&w=0&k=20&c=YKKSZ3lSu3h9FRcY9aN6Ee-E98i4MUmzBJZl2a0nYjU=" },
];

addAnimal.addEventListener("click", animalCard);

function animalCard() {
  let randomAnimal = Math.floor(Math.random() * animals.length);

  console.log(randomAnimal);

  createAnimalCard(animals[randomAnimal]);
}

function createAnimalCard(animal) {

  const animalCard = document.createElement("div");
  const animalName = document.createElement('h1');
  animalName.classList.add('country__name');
  animalName.innerText = `this is ${animal.name}`;

  const img = document.createElement('img');
  img.classList.add('country__img');

  img.src = `${animal.img}`;

  animalCard.append(animalName, img);

  animalCards.append(animalCard);
}
