//1. Create an async function called getCountries
//  - retrieve the name, capital, population and flags for all countries.
//  - Convert the response to JSON.
//  - pass the data to the displayCountries function.
//  - Catch any errors and log them to the console.
const allUrl = 'https://restcountries.com/v3.1/all';
const filteredUrl = 'https://restcountries.com/v3.1/all?fields=name,capital,population,flags,region'
const parentDiv = document.querySelector('.countries')


async function getCountries(url){
    try {
        const response = await fetch(url)

        if(!response.ok) throw new Error('Something went wrong')
        const data = await response.json();
        displayCountries(data);
    }
    catch (error){
        throw Error(`Error fetching from url:`, error);
    }
};

//2. Create a displayCountries function that takes in an array of countries.
//  - Loop over the array of countries.
//      - Create a div for each country.
//      - Add the country name and flag to the div with the provided HTML structure.
//      - Add the created div to the `.countries` container element.

//3. Call the getCountries function.

function displayCountries(data){
    data.map( country => {
        const div = document.createElement('div');
        parentDiv.appendChild(div);
        console.log(country)
        div.innerHTML = `
        <div class="country">
        <h3 class="country-name">${country.name.common}</h3>
        <img class="country-flag" src="${country.flags.svg}" />
        <div class="content">
          <h3>Capital</h3>
          <p>${country.capital}</p>
          <h3>Population</h3>
          <p>${country.population}</p>
          <h3>Region</h3>
          <p>${country.region}</p>
        </div>
      </div>
        `

    });
};

getCountries(filteredUrl);
