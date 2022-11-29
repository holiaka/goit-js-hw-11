// Libries import
import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchPhoto } from './js/fetchFunctions';

const serchRequest = document.querySelector('.search-form');
serchRequest.addEventListener('submit', onSubmitRequest);

function onSubmitRequest(evt) {
  evt.preventDefault();
  const submitText = evt.currentTarget.elements.searchQuery.value;
  console.log(submitText);
  fetchPhoto(submitText, 1).then(photos => createHtmlPhotosColection(photos.data.hits));
}

let scrollOptions = {
  root: null,
  rootMargin: '300px',
  threshold: 1.0,
};

// let observer = new IntersectionObserver(callback, scrollOptions);

// const targetForScroll = document.querySelector('.js-target')
// observer.observe(targetForScroll);

const photoGallary = document.querySelector('.gallery');

function createHtmlPhotosColection(photosData) {
    const photosList = photosData.map((item) => createOneCard(item));
    photoGallary.insertAdjacentHTML('beforeend', photosList.join())
}

function createOneCard(item) {
    const {webformatURL, largeImageURL, tags, likes, views, comments, downloads} = item
    return oneCard = 
        `<a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy/>            
        <div class="info"><p class="info-item"><b>Likes</b><span>${likes}</span></p>
                <p class="info-item"><b>Views</b><span>${views}</span></p>
                <p class="info-item"><b>Comments</b><span>${comments}</span></p>
                <p class="info-item"><b>Downloads</b><span>${downloads}</span></p>
        </div></a>`;
}