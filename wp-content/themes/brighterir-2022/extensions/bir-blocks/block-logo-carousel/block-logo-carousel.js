const logoCarousel = document.querySelector(".carousel-container");

if (logoCarousel) {
  let autoplay = logoCarousel.getAttribute("data-autoplay");
  if (autoplay == 1) {
    autoplay = true;
  } else {
    autoplay = false;
  }
  let draggable = logoCarousel.getAttribute("data-draggable");
  if (draggable == 1) {
    autoplay = true;
  } else {
    autoplay = false;
  }

  let duration = logoCarousel.getAttribute("data-duration");
  let slides = logoCarousel.getAttribute("data-slidesToShow");

  new BlazeSlider(logoCarousel, {
    all: {
      enableAutoplay: autoplay,
      autoplayInterval: duration,
      draggable: draggable,
      slidesToShow: slides,
      slideGap: "6rem",
    },
    "(max-width: 1024px)": {
      slidesToShow: 4,
    },
    "(max-width: 768px)": {
      enableAutoplay: true,
      autoplayInterval: 5000,
      slidesToShow: 3,
      slideGap: "3rem",
      draggable: true,
      loop: true,
    },
    "(max-width: 500px)": {
      slidesToShow: 2,
      slideGap: "2rem",
      enableAutoplay: true,
      autoplayInterval: 5000,
      loop: true,
    },
  });
}
