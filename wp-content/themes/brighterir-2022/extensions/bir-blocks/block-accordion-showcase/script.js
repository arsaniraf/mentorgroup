jQuery("document").ready(function ($) {
	// VARIABLES

	if ($(".accordion-showcase").length > 0) {
		var offset = $("main .layout .content").position().left;
		var width = $("main .layout .content").outerWidth() / 2;

		var speed = $(".accordion-showcase").attr("data-speed");

		// SET THE FIRST ITEM AS THE ACTIVE ONE

		$(".accordion-showcase .item:first-of-type").addClass("active");
		$(".accordion-showcase .item:first-of-type").find(".content").slideDown();
		$(".accordion-showcase .item:first-of-type").attr("aria-expanded", "true");
		$(".accordion-showcase .item:first-of-type")
			.find(".content")
			.attr("aria-hidden", "false");
		$(".accordion-showcase .item .right").css("right", offset + "px");
		$(".accordion-showcase .item .right").css("width", width + "px");

		// FUNCTION TO SELECT ACCORDION ITEM

		function selectItem(e) {
			$(e).addClass("active");
			$(e).find(".content").attr("aria-hidden", "false");
			$(e).find(".content").slideDown();
			$(e).attr("aria-expanded", "true");
			$(e).siblings().removeClass("active");
			$(e).siblings().attr("aria-expanded", "false");
			$(e).siblings().find(".content").slideUp();
			$(e).siblings().find(".content").attr("aria-hidden", "true");

			index = $(e).attr("data-item");
		}

		// LOOP THROUGH THE ITEMS

		var rotate = $(".accordion-showcase").attr("autorotate");

		var $item = $(".accordion-showcase .item");
		var index = 0;

		var slideshowInterval;

		var moveSlideshow = function () {
			if (rotate == true) {
				slideshowInterval = setInterval(function () {
					selectItem($item.eq(index));
					// increment the index - if it is beyond the number of items - reset it to 0
					if (++index >= $item.length) index = 0;
				}, speed);
			}
		};

		var observer = new IntersectionObserver(function (entries) {
			entries.forEach(function (entry) {
				if (entry.isIntersecting) {
					moveSlideshow();
				} else {
					clearInterval(slideshowInterval);
				}
			});
		});

		observer.observe($(".accordion-showcase")[0]);

		// CLICK FUNCTION

		$(".accordion-showcase .item").click(function () {
			selectItem(this);
		});

		// STOP SLIDESHOW ON HOVER

		$(".accordion-showcase").hover(
			function () {
				clearInterval(slideshowInterval);
			},
			function () {
				moveSlideshow();
			}
		);

		// RESIZE AND ADJUST POSITION OF THE RIGHT ELEMENT

		$(window).resize(function () {
			var offset = $("main .content").position().left;
			var width = $("main .content").outerWidth() / 2;

			$(".accordion-showcase .item .right").css("right", offset + "px");
			$(".accordion-showcase .item .right").css("width", width + "px");
		});

		const baseUrl = document.location.href;
		const id = baseUrl.substring(baseUrl.lastIndexOf("#"));

		// if string contains character
		if (id.indexOf("#") !== -1) {
			if (window.location.href.indexOf(id) > -1) {
				console.log($(id).offset().top);
				$("html, body").animate(
					{
						scrollTop: $(id).offset().top - 100,
					},
					450
				);

				setTimeout(function () {
					$(id).click();
				}, 500);
			}
		}
	}
});
