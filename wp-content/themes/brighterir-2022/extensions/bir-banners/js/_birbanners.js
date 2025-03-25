jQuery(document).ready(function ($) {
	if (
		$('.page #floating-cta').length > 0 ||
		$('.archive #floating-cta').length > 0 ||
		$('.single-portfolio #floating-cta').length > 0
	) {
		floatingCta();
	}

	// Play video on mobile

	var slideWrapper = $('.main-slider'),
		iframes = slideWrapper.find('.embed-player'),
		lazyImages = slideWrapper.find('.slide-image'),
		lazyCounter = 0;

	// POST commands to YouTube or Vimeo API
	function postMessageToPlayer(player, command) {
		if (player == null || command == null) return;
		player.contentWindow.postMessage(JSON.stringify(command), '*');
	}

	// When the slide is changing
	function playPauseVideo(slick, control) {
		var currentSlide, slideType, startTime, player, video;

		currentSlide = slick.find('.slick-current');
		slideType = currentSlide.attr('class').split(' ')[1];
		player = currentSlide.find('iframe').get(0);
		startTime = currentSlide.data('video-start');

		if (slideType === 'vimeo') {
			switch (control) {
				case 'play':
					if (
						startTime != null &&
						startTime > 0 &&
						!currentSlide.hasClass('started')
					) {
						currentSlide.addClass('started');
						postMessageToPlayer(player, {
							method: 'setCurrentTime',
							value: startTime,
						});
					}
					postMessageToPlayer(player, {
						method: 'play',
						value: 1,
					});
					break;
				case 'pause':
					postMessageToPlayer(player, {
						method: 'pause',
						value: 1,
					});
					break;
			}
		} else if (slideType === 'youtube') {
			switch (control) {
				case 'play':
					postMessageToPlayer(player, {
						event: 'command',
						func: 'mute',
					});
					postMessageToPlayer(player, {
						event: 'command',
						func: 'playVideo',
					});
					break;
				case 'pause':
					postMessageToPlayer(player, {
						event: 'command',
						func: 'pauseVideo',
					});
					break;
			}
		} else if (slideType === 'video') {
			video = currentSlide.children('video').get(0);
			if (video != null) {
				if (control === 'play') {
					video.play();
				} else {
					video.pause();
				}
			}
		}
	}

	// Resize player
	function resizePlayer(iframes, ratio) {
		if (!iframes[0]) return;
		var win = $('.main-slider'),
			width = win.width(),
			playerWidth,
			height = win.height(),
			playerHeight,
			ratio = ratio || 16 / 9;

		iframes.each(function () {
			var current = $(this);
			if (width / ratio < height) {
				playerWidth = Math.ceil(height * ratio);
				current
					.width(playerWidth)
					.height(height)
					.css({
						left: (width - playerWidth) / 2,
						top: 0,
					});
			} else {
				playerHeight = Math.ceil(width / ratio);
				current
					.width(width)
					.height(playerHeight)
					.css({
						left: 0,
						top: (height - playerHeight) / 2,
					});
			}
		});
	}

	// DOM Ready
	$(function () {
		// Initialize
		slideWrapper.on('init', function (slick) {
			slick = $(slick.currentTarget);
			setTimeout(function () {
				playPauseVideo(slick, 'play');
			}, 1000);
			resizePlayer(iframes, 16 / 9);
		});
		slideWrapper.on('beforeChange', function (event, slick) {
			slick = $(slick.$slider);
			playPauseVideo(slick, 'pause');
		});
		slideWrapper.on('afterChange', function (event, slick) {
			slick = $(slick.$slider);
			playPauseVideo(slick, 'play');
		});
		slideWrapper.on('lazyLoaded', function (event, slick, image, imageSource) {
			lazyCounter++;
			if (lazyCounter === lazyImages.length) {
				lazyImages.addClass('show');
				// slideWrapper.slick("slickPlay");
			}
		});

		//start the slider
		slideWrapper.slick({
			lazyLoad: 'progressive',
		});
	});

	// Resize event
	$(window).on('resize.slickVideoPlayer', function () {
		resizePlayer(iframes, 16 / 9);
		if (
			$('.page #floating-cta').length > 0 ||
			$('.archive #floating-cta').length > 0 ||
			$('.single-portfolio #floating-cta').length > 0
		) {
			floatingCta();
		}
	});

	$(window).on('scroll', function () {
		if (
			$('.page #floating-cta').length > 0 ||
			$('.archive #floating-cta').length > 0 ||
			$('.single-portfolio #floating-cta').length > 0
		) {
			floatingCta();
		}
	});
});

function floatingCta() {
	// If is not the home page
	// get header height
	var headerHeight = document.querySelector('.header').offsetHeight;

	// Banner CTA
	var bannerCta = document.getElementById('banner-cta-anchor');

	if (!bannerCta) return;

	// Floating Bottom Right CTA
	var floatingCta = document.getElementById('floating-cta');

	// Footer CTA
	var getInTouch = document.getElementById('cta-footer');

	// get bannerCta left position relative to viewport
	var bannerCtaTop = bannerCta.getBoundingClientRect().top;

	// get footerCTA button position
	var footerCtaTop = getInTouch.getBoundingClientRect().top;
	var footerCtaLeft = getInTouch.getBoundingClientRect().left;

	// get position of get-in-touch section from bottom

	// get height of get-in-touch section
	var getInTouchHeight = getInTouch.offsetHeight;
	var getInTouchBottom =
		getInTouch.getBoundingClientRect().bottom -
		getInTouchHeight -
		window.innerHeight;

	// When the banner CTA is in the viewport
	if (bannerCtaTop > headerHeight) {
		// set top position of floating-cta

		floatingCta.style.top = bannerCtaTop + 'px';
		floatingCta.style.left = '100%';
		floatingCta.classList.add('banner-active');
		floatingCta.classList.remove('main-active');
		setTimeout(function () {
			floatingCta.style.transition = '0ms ease-out';
		}, 450);
	}

	// When MAIN is in the viewport
	if (bannerCtaTop <= headerHeight && getInTouchBottom > 0) {
		floatingCta.style.transition = '450ms ease-out';
		floatingCta.classList.add('main-active');

		// if is desktop only
		if (window.innerWidth > 768) {
			floatingCta.style.transform = 'translate(-100%, -100%)';
			floatingCta.style.top = 'calc(100vh - 20px)';
			floatingCta.style.left = 'calc(100% - 20px)';
		}

		floatingCta.classList.remove('banner-active');
		floatingCta.classList.remove('footer-active');
	}

	// When we reach the bottom of the page
	if (getInTouchBottom <= 300) {
		floatingCta.classList.add('footer-active');
		floatingCta.classList.remove('main-active');
		floatingCta.style.top = footerCtaTop + 'px';
		floatingCta.style.left = footerCtaLeft + 'px';
		floatingCta.style.transform = 'translate(0, 0)';

		//delay the transition so it doesn't look weird
		setTimeout(function () {
			floatingCta.style.transition = '0ms ease-out';
		}, 0);
	}
}
