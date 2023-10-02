let countries = [];
const modalContent = document.querySelector('.modal-content');
const overlay = document.querySelector('.overlay');
const closeButton = document.querySelector('.modal-close');
const container = document.querySelector('.countries');

//========================
//  Your Code Goes Here
//------------------------

// Create a click event listener on the container element
//   Make sure that only clicks on the country element are targeted
//     Get the country name from the clicked element
//     Find the country object in the countries array that matches the name

//   update the modal content with the country data
//   add the open class to the overlay element

// Create a click event listener on the close button
//   remove the open class from the overlay element

//========================
//  EXTRA CREDIT
//------------------------

// Close the modal when the user clicks outside of the modal

// Close the modal when the user presses the escape key



//========================
//  FETCH DATA
//------------------------
async function getCountries() {
  const response = await fetch(
    'https://restcountries.com/v3.1/all?fields=name,flags,capital,population,region'
  );
  const data = await response.json();
  countries = data;
  displayCountries(data);
  return data;
}

function displayCountries(countries) {
  const countriesHTML = countries
    .map(
      (country) => `
          <div class="country" data-name="${country.name.common}">
              <h3 class="country-name">${country.name.common}</h3>
              <img class="country-flag" src="${country.flags.svg}" />
          </div>
      `
    )
    .join('');
  container.innerHTML = countriesHTML;
}

getCountries();
