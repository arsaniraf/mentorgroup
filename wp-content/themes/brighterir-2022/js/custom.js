(function ($) {
	// ===============================================
	// STICKY HEADER
	// ===============================================

	$(window).scroll(function () {
		const header = $('.header');
		const homeCta = $('#home-cta');

		if ($(document).scrollTop() > header.outerHeight()) {
			header.addClass('sticky');
			homeCta.addClass('active');
		} else {
			header.removeClass('sticky');
			homeCta.removeClass('active');
		}
	});

	$(document).ready(function () {
		const testimonial = document.querySelector('.testimonial');
		const award = document.querySelector('.intro .awards');

		const options = {
			rootMargin: '-150px',
		};

		const observer = new IntersectionObserver(function (entries, observer) {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add('active');
				}
			});
		}, options);

		if ($('.testimonial').length) {
			observer.observe(testimonial);
		}

		if ($('.awards').length) {
			observer.observe(award);
		}
	});

	// KONAMI CODE

	var KONAMI = [];

	function checkKeycode(e) {
		var keycode;
		if (window.event) {
			keycode = window.event.keyCode;
		} else if (e) {
			keycode = e.which;
		}
		KONAMI.push(keycode);

		if (KONAMI.toString() == '38,38,40,40,37,39,37,39,66,65') {
			console.log('Unlocked!');
			$('.egg').replaceWith(
				'<video id="egg" loop autoplay><source src="https://wp-brighterir-2022.s3.eu-west-2.amazonaws.com/media/2023/01/easter-egg.mp4" type="video/mp4"></video>'
			);
			document.getElementById('egg').play();
			$('.inner-banner.home .is-style-intro').css('transition', '750ms');
			$('.header').addClass('egg');
			$('.inner-banner.home .is-style-intro').css('color', 'white');
		}
	}

	document.onkeydown = checkKeycode;

	// -----------------------------------------------------------------------------
	// MOBILE MENU
	// -----------------------------------------------------------------------------

	jQuery(document).ready(function ($) {
		// Set class for mobile menu customisation

		// Hamburger menu animation
		var mobileAnim = $('#nav_mobile').attr('data-menu-mobile-anim');
		var animationSpeed = parseInt(
			$('#nav_mobile').attr('data-menu-mobile-anim-speed')
		);

		$('.header-nav').addClass(mobileAnim);
		$('.header-nav').css('transition', 'all ' + animationSpeed + 'ms ease-out');

		var scrollPosition = '0';

		$('#nav_mobile').click(function () {
			const $body = document.querySelector('body');
			const $html = document.querySelector('html');
			const siteNavigation = document.querySelector('#site-navigation');

			// Remove style for desktop
			var resizeId;
			function doneResizing() {
				var windowWidth = $(window).width();
				if (windowWidth > 1024) {
					$('nav.mmenu-active .menu-item-has-children > a').removeClass(
						'submenu-visible'
					);
					$html.style.removeProperty('overflow');
					$body.style.removeProperty('position');
					$body.style.removeProperty('top');
					$('ul.sub-menu').removeAttr('style');
				}
			}

			// Deactivate menu
			if ($(this).attr('menu-mobile') == 'active') {
				$(this).attr('menu-mobile', 'not-active');

				$html.style.removeProperty('overflow');
				$body.style.removeProperty('position');
				$body.style.removeProperty('top');
				$body.style.removeProperty('width');

				window.scrollTo(0, scrollPosition);

				$('header.header').removeClass('hamb-open');

				// Control the aria expanded for site menu
				siteNavigation.setAttribute('aria-expanded', 'false');
			}

			// Activate menu
			else {
				$('header.header').addClass('hamb-open');

				var header_height = $('.hamb-open').height();

				$('nav.header-nav > ul').css('margin-top', header_height);

				$(window).resize(function () {
					clearTimeout(resizeId);
					resizeId = setTimeout(doneResizing, 200);
				});

				$(this).attr('menu-mobile', 'active');
				scrollPosition = window.pageYOffset;

				$html.style.overflow = 'hidden';

				// Control the aria expanded for site menu
				siteNavigation.setAttribute('aria-expanded', 'true');
			}

			$('html').toggleClass('menu-opened');
			$(this).prev().toggleClass('mmenu-active');

			// Open submenu with current subpage when collapsed option is selected
			if ($('.header-nav').hasClass('collapsed')) {
				$('nav.mmenu-active.collapsed .current-menu-parent a').addClass(
					'submenu-visible'
				);
				$(
					'nav.mmenu-active.collapsed .current-menu-parent ul.sub-menu'
				).slideDown(400);
			}
		});
	});

	// Accordion for sub menus
	$(document).on(
		'click',
		'nav.mmenu-active.collapsed.clickable .menu-item-has-children > a',
		function () {
			event.preventDefault();
			$(this).toggleClass('submenu-visible');
			$(this).next('ul.sub-menu').slideToggle(400);
		}
	);

	$(document).on(
		'click',
		'nav.mmenu-active.collapsed.not-clickable .menu-item-has-children',
		function () {
			if (event.target !== this) return;
			event.stopPropagation();
			event.preventDefault();
			$(this).find('> a').toggleClass('submenu-visible');
			$(this).find('ul.sub-menu').slideToggle(400);
		}
	);

	// -----------------------------------------------------------------------------
	// b2t
	// -----------------------------------------------------------------------------
	jQuery(document).ready(function ($) {
		var offset = 300,
			offset_opacity = 1200,
			scroll_top_duration = 700,
			$back_to_top = $('.cd-top');

		//hide or show the "back to top" link
		$(window).scroll(function () {
			$(this).scrollTop() > offset
				? $back_to_top.addClass('cd-is-visible')
				: $back_to_top.removeClass('cd-is-visible cd-fade-out');
			if ($(this).scrollTop() > offset_opacity) {
				$back_to_top.addClass('cd-fade-out');
			}
		});

		//smooth scroll to top
		$back_to_top.on('click', function (event) {
			event.preventDefault();
			$('body,html').animate(
				{
					scrollTop: 0,
				},
				scroll_top_duration
			);
		});
	});

	// -----------------------------------------------------------------------------
	// ACCORDION
	// -----------------------------------------------------------------------------
	jQuery(document).ready(function ($) {
		var accordion_container = $(
			'.accordion > .wp-block-group__inner-container'
		);
		var headings = accordion_container.children('h3');
		var panels = accordion_container.children('.wp-block-group');
		panels.not('.open').hide();

		headings.click(function () {
			if ($(this).hasClass('open')) {
				$(this).removeClass('open');
				$(this).next().slideUp();
				$(this).next().removeClass('open');
			} else {
				panels.slideUp();
				panels.removeClass('open');
				headings.removeClass('open');

				$(this).addClass('open');
				$(this).next().slideDown();
				$(this).next().addClass('open');
			}

			return false;
		});
	});

	// -----------------------------------------------------------------------------
	// CHILD PAGES WIDGET
	// -----------------------------------------------------------------------------
	jQuery(document).ready(function ($) {
		$('select#child_pages').change(function () {
			location.href = $(this).val();
		});
	});

	// -----------------------------------------------------------------------------
	// IMAGE LIGHTBOX
	// Use '.lightbox' class on image block to activate
	// CSS is in the ./base/_utilities.scss file. I've used basic animation but feel free to spice things up!
	// -----------------------------------------------------------------------------
	jQuery(document).ready(function ($) {
		$('.lightbox').click(function () {
			var src = $(this).find('img').attr('src');
			var alt = $(this).find('img').attr('alt');

			if (document.querySelector('.img-lightbox') !== null) {
				// .. it exists
				createLightbox(src, alt);
			} else {
				//  .. it doesn't exist, so create the element.
				$(
					'<div class="img-lightbox"><div class="closeLightbox"><i class="fas fa-times"></i></div><img src="/"/></div>'
				).appendTo('body');
				// Timeout required to enable animation. Even just 1 milisecond is enough.
				setTimeout(function () {
					createLightbox(src, alt);
				}, 1);
			}
		});

		function createLightbox(src, alt) {
			$('.img-lightbox img').attr('src', src);
			$('.img-lightbox img').attr('alt', alt);

			$('.img-lightbox').toggleClass('active');

			$('.img-lightbox, .closeLightbox').click(function () {
				$('.img-lightbox').removeClass('active');
			});
			$('.img-lightbox img').click(function (e) {
				e.stopPropagation();
			});

			$(document).on('keyup', function (e) {
				if (e.key === 'Escape') {
					$('.img-lightbox').removeClass('active');
				}
			});
		}

		// DEVICE TOGGLE BUTTON

		$('.devices .device-toggle').click(function () {
			if ($('.devices .mobile').hasClass('show')) {
				$('.devices .mobile').removeClass('show');
				$('.devices .laptop').addClass('show');
				$('.devices .wrap .laptop-btn').hide();
				$('.devices .wrap .mobile-btn').show();
			} else {
				$('.devices .wrap .laptop-btn').show();
				$('.devices .wrap .mobile-btn').hide();
				$('.devices .laptop').removeClass('show');
				$('.devices .mobile').addClass('show');
			}
		});

		// SHARE BUTTON
		$('.share .btn').click(function () {
			if ($('.share-container').hasClass('active')) {
				$('.share-container').removeClass('active');
			} else {
				$('.share-container').addClass('active');
			}
		});

		$('.share .share-link.link').click(function () {
			const url = document.location.href;

			navigator.clipboard.writeText(url).then(
				function () {
					$('.share .share-link.link span').text('Copied');
					$('.share .share-link.link').addClass('copied');
					setTimeout(function () {
						$('.share .share-link.link').removeClass('copied');
					}, 650);
				},
				function () {
					$('.share .share-link.link span').text('Error.');
					$('.share .share-link.link').addClass('copied');
					setTimeout(function () {
						$('.share .share-link.link').removeClass('copied');
					}, 650);
				}
			);
		});
	});
})(jQuery);

document.addEventListener('DOMContentLoaded', () => {
	const form = document.querySelector('#gform_fields_2');
	if (form) {
		const formInputs = form.querySelectorAll('.gfield');
		let currentIndex = 0;

		const activateNextField = () => {
			if (currentIndex < formInputs.length) {
				const currentField = formInputs[currentIndex];
				const input = currentField.querySelector('input, textarea, select');
				const radioGroup = currentField.querySelectorAll("input[type='radio']");
				let isValid = true;

				if (input) {
					if (input.value.trim() === '') {
						isValid = false;
					}
				}

				if (radioGroup.length > 0) {
					if (!Array.from(radioGroup).some((radio) => radio.checked)) {
						isValid = false;
					}
				}

				if (isValid) {
					const height = currentField.nextElementSibling.scrollHeight;
					currentField.nextElementSibling.classList.add('active');
					currentField.nextElementSibling.style.height = height + 'px';
					currentIndex++;

					// focus on next field
					setTimeout(() => {
						currentField.nextElementSibling
							.querySelector('input, textarea, select')
							.focus();
					}, 401);

					if (currentIndex === formInputs.length - 1) {
						form.querySelector('button').remove();
					}
				} else {
					// if current field is invalid, set height of all other fields to 0
					formInputs.forEach((field) => {
						if (field !== currentField) {
							field.nextElementSibling.style.height = '0';
						}
					});

					// if top field is empty, keep continue button and set height of current field to 0
					if (currentIndex === 0 && input.value.trim() === '') {
						currentField.nextElementSibling.style.height = '0';
					} else {
						// otherwise, remove continue button
						form.querySelector('button').remove();
					}
				}
			}
		};

		const continueButton = document.createElement('button');
		continueButton.textContent = 'Continue';
		continueButton.classList.add('gform_continue');

		form.appendChild(continueButton);
		continueButton.addEventListener('click', (e) => {
			e.preventDefault();
			activateNextField();
		});
	}
});
