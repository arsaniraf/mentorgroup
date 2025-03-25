if (document.querySelector('.main-scroller')) {
	const main = document.querySelector('.main-scroller');
	const mainHeight =
		main.querySelector('.scroller-wrapper').offsetHeight + 'px';
	// set height of main to height of scroller
	main.style.height = mainHeight;

	// get width of .main-scroller
	let scrollContainer = document.querySelector('.block-showcase-carousel');
	let scroller = document.querySelector('.main-scroller .scroller-wrapper');
	let xScroll = -(scroller.offsetWidth - scrollContainer.offsetWidth) + 'px';
	let wpAdmin = document.querySelector('#wpadminbar');
	let topHeight = '';

	if (wpAdmin === null) {
		topHeight = 'top ' + 65.5 + 'px';
	} else {
		topHeight = 'top ' + 97.5 + 'px';
	}

	gsap.to(scrollContainer, {
		duration: 2,
		ease: 'none',
		scrollTrigger: {
			trigger: scrollContainer,
			start: topHeight,
			end: 'bottom -200%',
			scrub: 1,
			pin: true,
			markers: false,
			pinnedContainer: scrollContainer,
			anticipatePin: 0,
		},
	});

	gsap.to(scroller, {
		x: xScroll,
		duration: 1,
		ease: 'none',
		scrollTrigger: {
			start: 'top 12%',
			trigger: scroller,
			end: 'bottom -190%',
			scrub: 1,
		},
	});

	ScrollTrigger.batch('.block-showcase-carousel .slideshow__slide', {
		interval: 0.25,
		onEnter: (batch) =>
			gsap.to(batch, {
				autoAlpha: 1,
				translateY: '0',
				translateX: '0',
				rotate: '0',
				stagger: 0.15,
				duration: 0.75,
			}),
	});

	// scroll event listener
	window.addEventListener('scroll', function () {
		scrollFunction();
	});

	scrollFunction = () => {
		// get left position of the scroller
		var irLeft = document
			.querySelector('.main-scroller .scroller-wrapper .ir-tools')
			.getBoundingClientRect().left;
		var designLeft = document
			.querySelector('.main-scroller .scroller-wrapper .design')
			.getBoundingClientRect().left;

		if (irLeft < 400) {
			// add class to .header-scroller
			document.querySelector('.header-scroller ').classList.add('ir-tools');
		} else {
			document.querySelector('.header-scroller').classList.remove('ir-tools');
		}

		if (designLeft < 400) {
			// add class to .header-scroller
			document.querySelector('.header-scroller ').classList.add('design');
			document.querySelector('.header-scroller').classList.remove('ir-tools');
		} else {
			document.querySelector('.header-scroller ').classList.remove('design');
		}

		// for each item in slideshow
		var slideshow = document.querySelectorAll(
			'.main-scroller .scroller-wrapper .slideshow .slideshow__slide'
		);
		// get style padding of .wrap
		var wrapPadding = parseInt(
			window.getComputedStyle(document.querySelector('.wrap')).paddingLeft,
			10
		);

		slideshow.forEach(function (slide) {
			var slideLeft = slide.getBoundingClientRect().left;
			var slideWidth = slide.getBoundingClientRect().width;

			if (slideLeft <= slideWidth + wrapPadding && slideLeft >= wrapPadding) {
				// add class to .slideshow__slide
				slide.classList.add('active');
			} else {
				slide.classList.remove('active');
			}
		});
	};
}
