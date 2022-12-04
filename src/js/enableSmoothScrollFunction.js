export function enableSmoothScroll(photoGallary) {
  const { height: cardHeight } =
      photoGallary.firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
}