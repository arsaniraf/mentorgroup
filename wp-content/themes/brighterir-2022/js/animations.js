// When the DOM has loaded in vanilla JS
document.addEventListener('DOMContentLoaded', function () {
	gsap.registerPlugin(ScrollTrigger);

	// Full page screenshot

	if (document.querySelector('.full-screenshot')) {
		let screenshotTimeline = gsap.timeline({
			scrollTrigger: {
				trigger: '.full-screenshot',
				start: 'top 70%',
				end: 'bottom 50%',
				scrub: 0.2,
			},
		});

		screenshotTimeline
			.to('.full-screenshot img', {
				scale: 1.2,
				duration: 0.75,
			})
			.to('.full-screenshot img', {
				scale: 1.2,
				duration: 0.75,
			})
			.to('.full-screenshot img', {
				scale: 1.2,
				duration: 0.75,
			})
			.to('.full-screenshot img', {
				scale: 1,
				duration: 0.75,
			});
	}

	// ANIMATE THE DEVICE SCROLL

	// LAPTOP

	if (document.querySelectorAll('.devices').length > 0) {
		window.addEventListener('load', function () {
			const devices = document.querySelectorAll('.devices');

			devices.forEach(function (device) {
				const laptopContainer = device.querySelector(
					'.laptop .screenshot-container'
				);
				const laptopImg = laptopContainer.querySelector('img');
				const translateLaptopOffset =
					laptopImg.clientHeight - laptopContainer.clientHeight;
				const mobContainer = device.querySelector(
					'.mobile .screenshot-container'
				);
				const mobImgHeight = mobContainer.querySelector('img');
				const translateMobOffset =
					mobImgHeight.clientHeight - mobContainer.clientHeight;

				const laptopTimeline = gsap.timeline({
					scrollTrigger: {
						trigger: device,
						start: 'top 30%',
						end: 'bottom 0%',
						scrub: 1,
						pin: true,
						markers: false,
						anticipatePin: 0,
					},
				});

				const mobileTimeline = gsap.timeline({
					scrollTrigger: {
						trigger: device,
						start: 'top 30%',
						end: 'bottom 0%',
						scrub: 1,
						pin: true,
						markers: false,
						anticipatePin: 0,
					},
				});

				laptopTimeline.to(
					device.querySelector('.laptop .screenshot-container img'),
					{
						translateY: -translateLaptopOffset + 'px',
						duration: 3,
					}
				);

				mobileTimeline.to(
					device.querySelector('.mobile .screenshot-container img'),
					{
						translateY: -translateMobOffset + 'px',
						duration: 3,
					}
				);
			});
		});
	}

	// FEATURED IMAGE

	if (document.querySelector('.featured-image')) {
		gsap.to('.featured-image img', {
			scrollTrigger: {
				trigger: '.featured-image',
				start: 'top 70%',
				end: 'bottom 40%',
				scrub: 2,
			},
			scale: '1',
			duration: 3,
		});
	}

	// ANIMATE STARS
	const stars = gsap.utils.toArray('.inner-banner .stars svg');

	if (document.querySelector('.stars')) {
		stars.forEach((item) => {
			gsap.to(item, {
				rotate: 90,
				opacity: 1,
				duration: 0.75,
				scrollTrigger: {
					trigger: item,
					scrub: 2,
				},
			});
		});
	}

	// ANIMATE THE GALLERY (STAGGERED)

	if (document.querySelector('.gallery')) {
		ScrollTrigger.batch('.gallery li', {
			interval: 1,
			batchMax: 2,
			start: 'top 80%',
			onEnter: () =>
				gsap.to('.gallery li img', {
					autoAlpha: 1,
					translateY: 0,
					stagger: 0.2,
					duration: 1,
				}),
		});
	}

	// ANIMATE HEADERS (NON STAGGER)

	const fadeUp = gsap.utils.toArray(
		'.side h2, .fade, .fade p, .is-style-contacts li'
	);

	fadeUp.forEach((item) => {
		gsap.from(item, {
			autoAlpha: 0,
			translateY: '0',
			duration: 0.75,
			scrollTrigger: {
				trigger: item,
				start: 'top 80%',
			},
		});
	});

	// SWIPE ANIMATION

	const swipe = gsap.utils.toArray('.swipe');

	swipe.forEach((item) => {
		gsap.to(item, {
			clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
			duration: 1,
			scrollTrigger: {
				trigger: item,
				start: 'top 80%',
			},
		});
	});

	// STAGGER ANIMATE IN (STAGGERED)

	const animateItems = [
		'.block-logo-carousel .slide',
		'.inner-banner h5',
		'.inner-banner h1',
		'.is-style-intro',
		'.stagger-left li',
		'.stagger-right li',
		'.stagger h4',
		'.post',
		'.fade-up',
		'.side li',
		'.brief ul li',
		'.fade-right',
		'.team-grid .team__member',
	];

	animateItems.forEach(function (item) {
		ScrollTrigger.batch(item, {
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
	});

	document.addEventListener('facetwp-loaded', function () {
		animateItems.forEach(function (item) {
			ScrollTrigger.batch(item, {
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
		});
	});
});
