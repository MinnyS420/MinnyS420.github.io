const url = "https://swapi.dev/api/";

const mainDiv = document.getElementById('main');
const filmsBtn = document.getElementById("filmsBtn");
const peopleBtn = document.getElementById("peopleBtn");
const planetsBtn = document.getElementById("planetsBtn");
const speciesBtn = document.getElementById("speciesBtn");
const starshipsBtn = document.getElementById("starshipsBtn");
const vehiclesBtn = document.getElementById("vehiclesBtn");

//This function fetches data from an endpoint and renders it to the DOM. It also stores the data in sessionStorage to avoid unnecessary requests. When a button is clicked, it fetches more detailed information about the element and displays it in a list.
async function fetchAndRenderData(endpoint, parentElem) {
  let data = null;
  const storageData = sessionStorage.getItem(endpoint);

  if (storageData) {
    data = JSON.parse(storageData);
  } else {
    let next = endpoint;
    while (next) {
      const response = await fetch(next);
      const responseData = await response.json();
      if (!data) {
        data = responseData;
      } else {
        data.results = [...data.results, ...responseData.results];
      }
      next = responseData.next;
    }
    sessionStorage.setItem(endpoint, JSON.stringify(data));
  }

  const elements = data.results;
  elements.forEach(element => {
    const cardBtn = document.createElement('button');
    cardBtn.setAttribute('class', 'cardBtn');
    cardBtn.setAttribute('data-url', element.url);
    cardBtn.textContent = element.name || element.title;
    cardBtn.addEventListener('click', async () => {
      const detailResponse = await fetch(element.url);
      const detailData = await detailResponse.json();
      const info = document.createElement('ul');
      for (const [key, value] of Object.entries(detailData)) {
        const listItem = document.createElement('li');
        listItem.textContent = `${key}: ${value}`;
        info.appendChild(listItem);
      }
      mainDiv.innerHTML = '';
      mainDiv.innerHTML = `<h1>${element.title||element.name}</h1>`;
      mainDiv.appendChild(info);
    });
    parentElem.appendChild(cardBtn);
  });
}

async function renderFilms() {
  mainDiv.innerHTML = '';
  const endpoint = url + 'films';
  await fetchAndRenderData(endpoint, mainDiv);
}

filmsBtn.addEventListener('click', renderFilms);

peopleBtn.addEventListener('click', () => {
  mainDiv.innerHTML = '';
  const endpoint = url + 'people';
  fetchAndRenderData(endpoint, mainDiv);
});

planetsBtn.addEventListener('click', () => {
  mainDiv.innerHTML = '';
  const endpoint = url + 'planets';
  fetchAndRenderData(endpoint, mainDiv);
});

speciesBtn.addEventListener('click', () => {
  mainDiv.innerHTML = '';
  const endpoint = url + 'species';
  fetchAndRenderData(endpoint, mainDiv);
});

starshipsBtn.addEventListener('click', () => {
  mainDiv.innerHTML = '';
  const endpoint = url + 'starships';
  fetchAndRenderData(endpoint, mainDiv);
});

vehiclesBtn.addEventListener('click', () => {
  mainDiv.innerHTML = '';
  const endpoint = url + 'vehicles';
  fetchAndRenderData(endpoint, mainDiv);
});
