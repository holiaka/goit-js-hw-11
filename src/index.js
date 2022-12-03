// Libries import
import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchPhoto } from './js/fetchFunctions';

const serchRequestRef = document.querySelector('.search-form');
serchRequestRef.addEventListener('submit', onSubmitRequest);

const clickButtonRef = document.querySelector('button');

let submitText = "";
let page = 1;

function onSubmitRequest(evt) {
  evt.preventDefault();
  if (!submitText.length) {

    if (submitText !== evt.currentTarget.elements.searchQuery.value) {
      clearGallery();
      submitText = evt.currentTarget.elements.searchQuery.value;
      console.log(submitText);
      fetchPhoto(submitText, page).then(photos => createHtmlPhotosColection(photos.data.hits));
    } else {
      console.log("You again inputted the same search request")
    }
    
  } else {
    console.log("The input field is empty!")
  }
}

const photoGallary = document.querySelector('.gallery');

function createHtmlPhotosColection(photosData) {
  console.log("photosData", photosData)
  if (photosData.length) {
    const photosList = photosData.map((item) => createOneCard(item));
    photoGallary.insertAdjacentHTML('beforeend', photosList.join(''))
  } else {
    console.log('Sorry, there are no images matching your search query. Please try again.')
  }    
}

function createOneCard(item) {
    const {webformatURL, largeImageURL, tags, likes, views, comments, downloads} = item
    const oneCard = 
        `<a class="gallery-card" href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy">            
        <div class="info"><p class="info-item"><b>Likes</b><span>${likes}</span></p>
                <p class="info-item"><b>Views</b><span>${views}</span></p>
                <p class="info-item"><b>Comments</b><span>${comments}</span></p>
                <p class="info-item"><b>Downloads</b><span>${downloads}</span></p>
        </div></a>`;
    return oneCard;
}

function clearGallery() {
  photoGallary.innerHTML = "";
  page = 1;
}

// let scrollOptions = {
//   root: null,
//   rootMargin: '100px',
//   threshold: 1.0,
// };

// let observer = new IntersectionObserver(newPhotosLoader, scrollOptions);

// const targetForScroll = document.querySelector('.js-target')
// observer.observe(targetForScroll);

// function newPhotosLoader() {
//   page += 1;
//   fetchPhoto(submitText, page).then(photos => createHtmlPhotosColection(photos.data.hits));
// }


