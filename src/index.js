// Libries import
import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchPhoto } from './js/fetchFunction';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const serchRequestRef = document.querySelector('.search-form');
serchRequestRef.addEventListener('submit', onSubmitRequest);

const clickButtonRef = document.querySelector('button');
const targetForScroll = document.querySelector('.js-target');
let gallery = new SimpleLightbox('.gallery a', {
  overlayOpacity: 0.9,
  captionDelay: 250,
});

let scrollOptions = {
  root: null,
  rootMargin: '300px',
  threshold: 1.0,
};

let observer = new IntersectionObserver(newPhotosLoader, scrollOptions);

let submitText = '';
let page = 0;

function onSubmitRequest(evt) {
  evt.preventDefault();
  if (evt.currentTarget.elements.searchQuery.value.trim().length) {
    if (submitText !== evt.currentTarget.elements.searchQuery.value) {
      clearGallery();
      submitText = evt.currentTarget.elements.searchQuery.value;
      observer.observe(targetForScroll);
    } else {
      Notify.info('You again inputted the same search request');
    }
  } else {
    clearGallery();
    Notify.failure('The input field is empty!');
  }
}

const photoGallary = document.querySelector('.gallery');

function createHtmlPhotosColection(photosData) {
  console.log('photosData', photosData);
  if (photosData.length) {
    const photosList = photosData.map(item => createOneCard(item));
    photoGallary.insertAdjacentHTML('beforeend', photosList.join(''));
    gallery.refresh();
    const { height: cardHeight } =
      photoGallary.firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  } else {
    clearGallery();
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
}

function createOneCard(item) {
  const {
    webformatURL,
    largeImageURL,
    tags,
    likes,
    views,
    comments,
    downloads,
  } = item;
  const oneCard = `<a class="gallery-card" href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy">            
        <div class="info"><p class="info-item"><b>Likes</b><span>${likes}</span></p>
                <p class="info-item"><b>Views</b><span>${views}</span></p>
                <p class="info-item"><b>Comments</b><span>${comments}</span></p>
                <p class="info-item"><b>Downloads</b><span>${downloads}</span></p>
        </div></a>`;

  return oneCard;
}

function clearGallery() {
  photoGallary.innerHTML = '';
  submitText = '';
  page = 0;
  observer.unobserve(targetForScroll);
}

function newPhotosLoader(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting === true) {
      page += 1;
      fetchPhoto(submitText, page).then(photos =>
        createHtmlPhotosColection(photos.data.hits)
      );
      fetchPhoto(submitText, page).then(photos =>
        analisysPhotoColection(photos.data.totalHits, page)
      );
    }
  });
}

function analisysPhotoColection(findPhotos, page) {
  if (page !== 1) {
    const totalPages = findPhotos / 40;
    if (totalPages < page) {
      observer.unobserve(targetForScroll);
      Notify.info("We're sorry, but you've reached the end of search results.");
    }
  } else if (findPhotos > 0) {
    Notify.success(`Hooray! We found ${findPhotos} images.`);
  }
}
