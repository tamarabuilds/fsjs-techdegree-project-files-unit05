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

container.addEventListener('click', (e)=> {
  const countryCard = e.target.closest('.country')
  if(!countryCard) return;

  const name = countryCard.dataset.name;
  const country = countries.find( 
    (country) => country.name.common === name)

  displayCountryModal(country);
});

function displayCountryModal(country){
  const html = `
    <h2>${country.name.common}</h2>
    <div class="flag">
      <img src="${country.flags.svg}" alt="" />
    </div>
    <div class="content">
      <h3>Population:</h3>
      <p>${country.population}</p>
      <h3>Region:</h3>
      <p>${country.region}</p>
      <h3>Capital:</h3>
      <p>${country.capital}</p>
    </div>
  `
  modalContent.innerHTML = html;

  overlay.classList.add('open')
};

function closeModal(){
  overlay.classList.remove('open')
}

closeButton.addEventListener('click', ()=> closeModal());

overlay.addEventListener('click', (e)=> {
  const isModal = e.target.closest('.modal')
  if(!isModal) closeModal();
});

document.addEventListener('keyup', (e)=> {
  if (e.key = 'Escape') closeModal();
});



/*
container.addEventListener('click', (e)=> {
  const clickedContainer = e.target.closest('.country');
  if (clickedContainer){
    // Set the name of the clicked country
    const clickedName = clickedContainer.dataset.name;

    // get the country object based on the clicked name
    let clickedCountryObject = ""
    countries.forEach( country => {
      country.name.common === clickedName ?
          clickedCountryObject = country : ''
    });
    console.log(clickedCountryObject);

    // update modal content with clicked country data
    modalContent.querySelector('h2').innerText = `${clickedCountryObject.name.common}`;
    modalContent.querySelector('.flag img').src = `${clickedCountryObject.flags.svg}`;
    const content = modalContent.querySelector('.content ')
    content.innerHTML = `
            <h3>Population:</h3>
            <p>${clickedCountryObject.population}</p>
            <h3>Region:</h3>
            <p>${clickedCountryObject.region}</p>
            <h3>Capital:</h3>
            <p>${clickedCountryObject.capital}</p>
    `
    overlay.classList.add('open');
  }

});

closeButton.addEventListener('click', ()=> closeModal());
document.addEventListener('click', (e)=> {
  // console.log(overlay.classList[1] === 'open')
  if(overlay.classList[1] === 'open'){
    // console.log(e.target)
    if (e.target === document.querySelector('.overlay')){
      closeModal();
    }
    
  }
});
document.addEventListener('keyup', (e)=> {
  if(overlay.classList[1] === 'open'){
    if(e.code === 'Escape'){
      closeModal();
    }
  }
});

function closeModal() {
  overlay.classList.remove('open');
}

*/



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
