const astrosUrl = 'http://api.open-notify.org/astros.json';
const wikiUrl = 'https://en.wikipedia.org/api/rest_v1/page/summary/';
const peopleList = document.getElementById('people');
const btn = document.querySelector('button');

function getJSON(url, allow404 = false) {
  //when allow404 == true, http 404 errors won't reject Promise
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = () => {
      if (xhr.status === 200 || (xhr.status === 404 && allow404)) {
        let data = JSON.parse(xhr.responseText);
        resolve(data);
      } else {
        reject(Error(xhr.statusText));
      }
    }
    xhr.onerror = () => reject(Error('A network error occured.'));
    xhr.send();
  });
}


function getProfiles(json) {
  const profiles = json.people.map(person => {
    const craft = person.craft;
    return fetch(wikiUrl + person.name)
        .then( response => response.json())
        .then( profile => {
          return {...profile, craft}
        })
        .catch( err => console.log(`Error fetching`,err))
    ;
  });
  return Promise.all(profiles);
}

function generateHTML(data) {
  data.map(person => {
    const section = document.createElement('section');
    peopleList.appendChild(section);
    if (person.title === 'Not found.') {
      /*If Bio page wasn't found, pull person's name out of URL and format a 
      section with defaults
      */
      let uriToTokens = person.uri.split('/');
      let name = decodeURI(uriToTokens[uriToTokens.length - 1]);
      section.innerHTML = `
     <img src="img/profile.jpg" alt="ocean clouds seen from space">
     <h2>${name}</h2>
     <p>Wikipedia results unavailable for ${name}</p>
     <p>But this person is really in space! Try searching 
     <a href="https://www.google.com/search?q=${encodeURIComponent(name)}" target="_blank">Google for them</a></p>
   `;
    } else if (person.type === 'standard') {
      // Check if request returns a 'standard' page from Wiki
      section.innerHTML = `
        <img src=${person.thumbnail.source}>
        <span>${person.craft}</span>
        <h2>${person.title}</h2>
        <p>${person.description}</p>
        <p>${person.extract}</p>
      `;
    } else {
      section.innerHTML = `
        <img src="img/profile.jpg" alt="ocean clouds seen from space">
        <h2>${person.title}</h2>
        <p>Results unavailable for ${person.title}</p>
        ${person.extract_html}
      `;
    }
  });
}

btn.addEventListener('click', (event) => {
  event.target.textContent = "Loading...";

  fetch(astrosUrl)
    .then( response => response.json() )
    .then(getProfiles)
    .then(generateHTML)
    // .catch( err => {
    //   peopleList.innerHTML = '<h3>Something went wrong!</h3>';
    //   console.log(err);
    // })
    .finally( () => event.target.remove() )
});