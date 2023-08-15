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
    const card = document.createElement('div'); // Create a card container
    card.classList.add('card'); // Add the card class

    const cardBtn = document.createElement('button');
    cardBtn.setAttribute('class', 'cardBtn');
    cardBtn.setAttribute('data-url', element.url);
    cardBtn.textContent = element.name || element.title;
    cardBtn.addEventListener('click', async () => {

      const detailResponse = await fetch(element.url);
      const detailData = await detailResponse.json();
      
      // Create a modal for displaying film details
      const modal = document.createElement('div');
      modal.classList.add('modal');

      const modalContent = document.createElement('div');
      modalContent.classList.add('modal-content');

      const modalHeader = document.createElement('div');
      modalHeader.classList.add('modal-header');

      const filmTitle = document.createElement('h2');
      filmTitle.textContent = element.title || element.name;
      modalHeader.appendChild(filmTitle);

      const modalClose = document.createElement('span');
      modalClose.classList.add('modal-close');
      modalClose.textContent = 'X';
      modalClose.addEventListener('click', () => {
        modal.style.display = 'none';
      });
      modalHeader.appendChild(modalClose);

      const infoList = document.createElement('ul');
      for (const [key, value] of Object.entries(detailData)) {
        const listItem = document.createElement('li');
        listItem.textContent = `${key}: ${value}`;
        infoList.appendChild(listItem);
      }

      modalContent.appendChild(modalHeader);
      modalContent.appendChild(infoList);
      modal.appendChild(modalContent);
      document.body.appendChild(modal);

      modal.style.display = 'block';
    });

    card.appendChild(cardBtn); // Add the button to the card container
    parentElem.appendChild(card); // Add the card container to the main div
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

document.addEventListener("DOMContentLoaded", function() {
  // Get a reference to the "Back to menu" button
  const backToMenuBtn = document.getElementById("backToMenuBtn");

  // Add a click event listener to the button
  backToMenuBtn.addEventListener("click", function() {
      // Reload the page to refresh the content
      location.reload();
  });
});