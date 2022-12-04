// CSS import
import './css/styles.css';
import 'simplelightbox/dist/simple-lightbox.min.css';

// Libries and JS-files import
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchPhoto } from './js/fetchFunction';
import SimpleLightbox from 'simplelightbox';
import { createOneCard } from './js/createOneCard';
import { enableSmoothScroll } from './js/enableSmoothScrollFunction';

// DOM references
const ref = {
  targetForScrollRef: document.querySelector('.js-target'),
  photoGallaryRef: document.querySelector('.gallery'),
  serchRequestRef: document.querySelector('.search-form'),
}

// Create input event listner
ref.serchRequestRef.addEventListener('submit', onSubmitRequest);

//SimpleLightbox lib. constructor
let gallery = new SimpleLightbox('.gallery a', {
  overlayOpacity: 0.9,
});

// Observer class create and observer options
let scrollOptions = {
  root: null,
  rootMargin: '300px',
  threshold: 1.0,
};
let observer = new IntersectionObserver(newPhotosLoader, scrollOptions);

// External var.
let submitText = '';
let page = 0;

//Func. list
function onSubmitRequest(evt) {
  evt.preventDefault();
  const userText = evt.currentTarget.elements.searchQuery.value;
  if (userText.trim().length) {
    if (submitText !== userText) {
      clearGallery();
      submitText = userText;
      observer.observe(ref.targetForScrollRef);
    } else {
      Notify.info('You again inputted the same search request');
    }
  } else {
    clearGallery();
    Notify.failure('The input field is empty!');
  }
}

function newPhotosLoader(entries) {  
  entries.forEach(entry => {    
    if (entry.isIntersecting === true) {  
      page += 1;
      fetchPhoto(submitText, page).then(photos =>
        analisysPhotoColection(photos.data, page)
      );
    }
  });
}

function clearGallery() {
  ref.photoGallaryRef.innerHTML = '';
  submitText = '';
  page = 0;
  observer.unobserve(ref.targetForScrollRef);
}

function analisysPhotoColection(findPhotos, page) {  
  const { totalHits, hits } = findPhotos;
  const totalPages = totalHits / 40;
  if (!totalHits) {
    clearGallery();
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  } else {
    createHtmlPhotosColection(hits);
    console.log(page)
    if (page === 1 && totalHits <= 40 ) {
      Notify.success(`Hooray! We found ${totalHits} images.`);      
      observer.unobserve(ref.targetForScrollRef);
      Notify.info("Here are include all the search results");
    } else if (page === 1 && totalHits > 40) {
      Notify.success(`Hooray! We found ${totalHits} images.`);
    }else if (totalPages < page) {      
      observer.unobserve(ref.targetForScrollRef);
      Notify.info("We're sorry, but you've reached the end of search results.");
    }
  }   
}

function createHtmlPhotosColection(photosData) {
  const photosList = photosData.map(item => createOneCard(item));
  ref.photoGallaryRef.insertAdjacentHTML('beforeend', photosList.join(''));
  gallery.refresh();
  enableSmoothScroll(ref.photoGallaryRef);
}
