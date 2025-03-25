const teamMembers = document.querySelectorAll(".team-grid .team__member");

ScrollTrigger.batch(".team-grid .team__member", {
  interval: 0.25,
  onEnter: (batch) =>
    gsap.to(batch, {
      autoAlpha: 1,
      translateY: "0",
      translateX: "0",
      rotate: "0",
      stagger: 0.15,
      duration: 0.75,
    }),
});

teamMembers.forEach(function (teamMember) {
  teamMember.addEventListener("click", function () {
    const isOpened = teamMember.getAttribute("aria-expanded") === "true";
    const cta = document.querySelector("#floating-cta");
    const getInTouch = document.querySelector("#get-in-touch");

    if (isOpened) {
      closeBio(teamMember);
      getInTouch.style.display = "block";
      cta.style.transition = "200ms ease-out";
      setTimeout(function () {
        floatingCta();
        cta.style.opacity = 1;
      }, 450);
    } else {
      openBio(teamMember);
      cta.style.opacity = 0;
      getInTouch.style.display = "none";
    }
  });
});

function openBio(e) {
  const bio = e.querySelector(".team__bio");
  const bioInner = bio.querySelector(".bio-body");

  e.setAttribute("aria-expanded", "true");
  bio.setAttribute("aria-hidden", "false");
  bio.style.height = bioInner.offsetHeight + "px";

  teamMembers.forEach(function (teamMember) {
    if (teamMember !== e) {
      closeBio(teamMember);
    }
  });
}

function closeBio(e) {
  const bio = e.querySelector(".team__bio");
  e.setAttribute("aria-expanded", "false");
  bio.setAttribute("aria-hidden", "true");
  bio.style.height = 0;
}

function floatingCta() {
  // get header height
  var headerHeight = document.querySelector(".header").offsetHeight;

  // Banner CTA
  var bannerCta = document.getElementById("banner-cta-anchor");

  // Floating Bottom Right CTA
  var floatingCta = document.getElementById("floating-cta");

  // Footer CTA
  var getInTouch = document.getElementById("cta-footer");

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
    floatingCta.style.top = bannerCtaTop + "px";
    floatingCta.style.left = "100%";
    floatingCta.classList.add("banner-active");
    floatingCta.classList.remove("main-active");
    setTimeout(function () {
      floatingCta.style.transition = "0ms ease-out";
    }, 450);
  }

  // When MAIN is in the viewport
  if (bannerCtaTop <= headerHeight && getInTouchBottom > 0) {
    floatingCta.style.transition = "450ms ease-out";
    floatingCta.classList.add("main-active");
    floatingCta.style.top = "calc(100% - 6em)";
    floatingCta.style.left = "calc(100% - 6em)";
    floatingCta.classList.remove("banner-active");
    floatingCta.classList.remove("footer-active");
  }

  // When we reach the bottom of the page
  if (getInTouchBottom <= 160) {
    floatingCta.classList.add("footer-active");
    floatingCta.classList.remove("main-active");
    floatingCta.style.top = footerCtaTop + "px";
    floatingCta.style.left = footerCtaLeft + "px";

    //delay the transition so it doesn't look weird
    setTimeout(function () {
      floatingCta.style.transition = "0ms ease-out";
    });
  }
}
