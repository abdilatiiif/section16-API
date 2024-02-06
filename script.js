"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

///////////////////////////////////////

const renderCountry = function (data, className = "") {
  const { currencies, languages } = data;

  const lang = [...Object.entries(languages)[0]];

  const curName = [...Object.entries(currencies)[0]][0];

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


const wait = (sec) => {
  return new Promise(resolve => {
    
    setTimeout(resolve, sec * 1000);
  });
  
}

const imgContainer = document.querySelector('.images');


const createImage = function(url) {
  
  return new Promise((resolve, reject) => {
    
    const img = document.createElement('img');
    
    img.src = url;
    
    img.addEventListener('load', () => {
      imgContainer.append(img); 
      resolve(img);
    });

    img.addEventListener('error', () => {
     
      reject( new Error (' img not found, url faild'));
    });

    
  })
  

};

let currentImg

createImage('https://images.unsplash.com/photo-1706007929255-a92ce654cd00?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNXx8fGVufDB8fHx8fA%3D%3D')
.then( img => {
  currentImg = img;
  console.log('img 1 loaded');
  return wait(2);
})
.then(() => {
  currentImg.style.display = 'none';
  return createImage('https://images.unsplash.com/photo-1706378396388-03713938c8bc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMHx8fGVufDB8fHx8fA%3D%3D');
})
.then( img => {
  currentImg = img;
  console.log('img 2 loaded');
  return wait(2 );
})
.then(() => { 
  currentImg.style.display = 'none';

})
.catch(err => console.error(err));
    
   

function getPosition() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

const whereAmI = async function () {
  try {

    const pos = await getPosition();
    
    const { latitude: lat, longitude: lng } = pos.coords;
    
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    if(!resGeo) throw new Error('problem getting geo location');
    
    const dataGeo = await resGeo.json();
    
  
    
    
    // country data
    const res = await fetch(`https://restcountries.com/v3.1/name/${dataGeo.country}`);
    if(!res) throw new Error('problem getting countryData');

    const data = await res.json();
    
    renderCountry(data[0]);


    return `Du er i ${dataGeo.country}, ${dataGeo.city}`;
  } catch (err) {
   renderError(err)
   throw err; 
  }
};

console.log(('1: heter location'))
whereAmI().then(city => console.log(city)); 

console.log(('3: hetet location'))



const get3Countries = async function (c1, c2, c3) {
  try {

     const data = await Promise.all([
      getJSON(`https://restcountries.com/v3.1/name/${c1}`),
      getJSON(`https://restcountries.com/v3.1/name/${c2}`),
      getJSON(`https://restcountries.com/v3.1/name/${c3}`),
    ]);

    console.log(data.map(d => d[0].capital));
  
  } catch (err) {
    console.error(err);
  }
};

get3Countries("norway", "somalia", "saudi");






const walkDog = function(nextWork)  {
  setTimeout(() => {
    console.log('you walked the dog');
  },1500)

  nextWork();
};

const cleanKitchen = function(nextWork) {
  setTimeout(() => {
    console.log('you cleaned the kitchen');
  },4300)
  nextWork();
  
};

const makeDinner = function(nextWork)  {
  setTimeout(() => {
    console.log('you cooked dinner');
  },3500)
  nextWork();

};


//callback hell

walkDog(() => {
  cleanKitchen(() => {
    makeDinner(() => {
      console.log('alle oppgavene er ferdig!'); 
    })
  })
});

*/

// promise chain callback
const walkDog = function () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const dogWalked = false;
      if (dogWalked) {
        resolve("you walked the dog");
      } else {
        reject("you DIDN`T walk the dog");
      }
    }, 1500);
  });
};

const cleanKitchen = function () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("you cleaned the kitchen");
    }, 4300);
  });
};

const makeDinner = function () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("you cooked dinner");
    }, 3500);
  });
};

/*
walkDog()
  .then((msg) => {
    console.log(msg);
    return cleanKitchen();
  })
  .then((msg) => {
    console.log(msg);
    return makeDinner();
  })
  .then((msg) => {
    console.log(msg);
  })
  .catch((err) => {
    console.error(err);
  });

*/

async function oppgaver() {
  try {
    const walkDogResult = await walkDog();
    const cleanKitchenResult = await cleanKitchen();
    const makeDinnerResult = await makeDinner();

    console.log(walkDogResult);
    console.log(cleanKitchenResult);
    console.log(makeDinnerResult);
  } catch (err) {
    console.error(err);
  }
}

oppgaver();


