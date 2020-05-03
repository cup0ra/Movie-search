

 const swiper = new Swiper('.swiper-container', {
  slidesPerView: 1,
  spaceBetween: 0,
  loop: false,
  centeredSlides: false,
  reachEnd:false,
  pagination: {
    el: '.swiper-pagination',
    type: 'progressbar',
},
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 0
    },
    500: {
      slidesPerView: 2,
      spaceBetween: 0
    },
    900: {
      slidesPerView: 3,
      spaceBetween: 0
    },
    1020: {
      slidesPerView: 4,
      spaceBetween: 0
    }
  }
});

module.export = swiper;