/* eslint-disable no-undef */
 const swiper = new Swiper('.swiper-container', {
  centerInsufficientSlides:true,
  slidesPerView: 4,
  spaceBetween: 0,
  loop: false,
  reachEnd:true,
  mousewheel: true,
  watchOverflow: true,
  pagination: {
    el: '.swiper-pagination',
    type: 'progressbar',
},
navigation: {
  nextEl: '.swiper-button-next',
  prevEl: '.swiper-button-prev',
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
  },
  
});
module.export = swiper;