document.addEventListener("DOMContentLoaded", function () {
  const modeBtn = document.querySelector(".mode-switch");
  const logo = document.querySelectorAll(".logo");
  const logoCTA = document.querySelector("#cta img");
  const nav = document.querySelector("header nav");
  const globe = document.querySelector(".globe");
  const contactBtns = document.querySelectorAll(".contact-btn");
  const closeBtn = document.querySelector(".close-btn");
  const contactContainer = document.querySelector(".contact-container");
  const video = document.getElementById("bg-video");
  const usMap = document.querySelector(".container .left img");
  const modeIcon = document.querySelector(".mode-switch .icon");
  const line = document.querySelectorAll(".line");
  const h1 = document.querySelector(".main-heading");
  const root = document.documentElement;
  let scrollSpeed = !isNotMobile() ? 0.12 : 0.07;
  let lightMode = false;

  const body = document.body;
  const main = document.getElementById("scroll");

  let sx = 0, // For scroll positions
    sy = 0;
  let dx = sx, // For container positions
    dy = sy;

  contactBtns.forEach((btn) =>
    btn.addEventListener(
      "click",
      () => (contactContainer.style.display = "block")
    )
  );

  closeBtn.addEventListener(
    "click",
    () => (contactContainer.style.display = "none")
  );

  function updateBodyHeight() {
    body.style.height =
      Math.max(
        main.clientHeight,
        document.documentElement.scrollHeight,
        document.body.scrollHeight,
        document.documentElement.offsetHeight,
        document.body.offsetHeight
      ) + "px";
  }

  updateBodyHeight();

  main.style.position = "fixed";
  main.style.top = 0;
  main.style.left = 0;

  // Bind a scroll function
  window.addEventListener("scroll", easeScroll);

  function easeScroll() {
    sx = window.pageXOffset;
    sy = window.pageYOffset;
  }

  window.requestAnimationFrame(render);

  function render() {
    // We calculate our container position by linear interpolation method
    dx = li(dx, sx, scrollSpeed);
    dy = li(dy, sy, scrollSpeed);

    dx = Math.floor(dx * 100) / 100;
    dy = Math.floor(dy * 100) / 100;

    main.style.transform = `translate3d(-${dx}px, -${dy}px, 0px)`;

    window.requestAnimationFrame(render);
  }

  function li(a, b, n) {
    return (1 - n) * a + n * b;
  }

  // Update body height on resize
  window.addEventListener("resize", updateBodyHeight);

  modeBtn.addEventListener("click", handleModeChange);

  window.addEventListener("scroll", () => {
    const scale = clamp(window.scrollY / 200, 1.5, 3.5);
    if (window.scrollY > 100 && isNotMobile()) {
      if (isNotTablet()) {
        video.style.transform = `scale(${scale})`;
        lightMode
          ? (video.style.opacity = "0.28")
          : (video.style.opacity = "0.12");
      }
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  });

  function handleModeChange() {
    lightMode = !lightMode;
    if (lightMode) {
      logo.forEach((l) => l.classList.add("invert"));
      usMap.classList.add("invert");
      logoCTA.classList.add("invert");
      video.classList.add("invert");
      globe.classList.add("invert");
      video.style.opacity = "0.55";
      root.style.setProperty("--primary-color", "#e8e8e8");
      root.style.setProperty("--secondary-color", "#080808");
      root.style.setProperty("--navbar", "#FFFFFF");
      root.style.setProperty("--border", "rgba(0, 0, 0, 0.3)");
      modeIcon.classList.add("light");
      line.forEach(
        (l) =>
          (l.style.background = `linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0) 0%,
        #000000 75%,
        #000000 100%
      )`)
      );
    } else {
      logo.forEach((l) => l.classList.remove("invert"));
      usMap.classList.remove("invert");
      logoCTA.classList.remove("invert");
      video.classList.remove("invert");
      globe.classList.remove("invert");
      video.style.opacity = "0.1";
      root.style.setProperty("--primary-color", "#080808");
      root.style.setProperty("--secondary-color", "#e8e8e8");
      root.style.setProperty("--navbar", "#131313");
      root.style.setProperty("--border", "rgba(232, 232, 232, 0.3)");
      modeIcon.classList.remove("light");
      line.forEach(
        (l) =>
          (l.style.background = `linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0) 0%,
        #ffffff 75%,
        #ffffff 100%
      )`)
      );
    }
  }
});

// Utility functions
const clamp = (number, min, max) => Math.min(Math.max(number, min), max);

// Check if the screen width is greater than a certain threshold (considered non-mobile)
function isNotMobile() {
  return window.innerWidth > 768;
}

// Check if the screen width is greater than a certain threshold (considered non-tablet)
function isNotTablet() {
  return window.innerWidth > 1025;
}
