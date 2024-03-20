document.addEventListener("DOMContentLoaded", function () {
  const modeBtn = document.querySelector(".mode-switch");
  const logo = document.querySelectorAll(".logo");
  const logoCTA = document.querySelector("#cta img");
  const nav = document.querySelector("header nav");
  const globe = document.querySelector(".globe");
  const contactBtns = document.querySelectorAll(".contact-btn");
  const closeBtn = document.querySelector(".close-btn");
  const contactContainer = document.querySelector(".contact-container");
  const contactForm = document.querySelector(".contact-form");
  const form = document.querySelector(".contact-form form");
  const successMessage = document.querySelector(".success-message");
  const video = document.getElementById("bg-video");
  const usMap = document.querySelector(".container .left img");
  const modeIcon = document.querySelector(".mode-switch .icon");
  const line = document.querySelectorAll(".line");
  const h1 = document.querySelector(".main-heading");
  const root = document.documentElement;
  let scrollSpeed = !isNotMobile() ? 0.22 : 0.07;
  let lightMode = false;

  const body = document.body;
  const main = document.getElementById("scroll");

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const formData = new FormData(form); // Use the form element directly
    
    contactForm.style.display = 'none';
    successMessage.style.display = 'flex';
  
    setTimeout(() => {
      contactForm.style.display = 'block';
      successMessage.style.display = 'none';
    }, 3000);
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        body: formData
      });
      
      if (response.ok) {
        alert('Email sent successfully!');
        // Optionally, reset the form
        form.reset();
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred. Please try again later.');
    }
  });
  
  // Scroll to the top of the page on page reload
  window.addEventListener("load", function () {
    window.scrollTo(0, 0);
    video.play();
  });

  let sx = 0,
    sy = 0; // For scroll positions
  let dx = sx,
    dy = sy; // For container positions

  contactBtns.forEach((btn) =>
    btn.addEventListener("click", () => {
      contactContainer.style.display = "block";
      toggleScrollLock(true);
    })
  );

  closeBtn.addEventListener("click", () => {
    contactContainer.style.display = "none";
    toggleScrollLock(false);
  });

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

  main.style.cssText = "position: fixed; top: 0; left: 0;";

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
          ? (video.style.opacity = "0.55")
          : (video.style.opacity = "0.2");
      }
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  });

  function handleModeChange() {
    lightMode = !lightMode;
    const videoOpacity = lightMode ? "0.55" : "0.2";
    const primaryColor = lightMode ? "#e8e8e8" : "#080808";
    const secondaryColor = lightMode ? "#080808" : "#e8e8e8";
    const navbarColor = lightMode ? "#FFFFFF" : "#131313";
    const borderColor = lightMode
      ? "rgba(0, 0, 0, 0.3)"
      : "rgba(232, 232, 232, 0.3)";
    const lineBackground = lightMode
      ? `linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, #000000 75%, #000000 100%)`
      : `linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, #ffffff 75%, #ffffff 100%)`;

    logo.forEach((l) => l.classList.toggle("invert", lightMode));
    usMap.classList.toggle("invert", lightMode);
    logoCTA.classList.toggle("invert", lightMode);
    video.classList.toggle("invert", lightMode);
    globe.classList.toggle("invert", lightMode);
    video.style.opacity = videoOpacity;
    root.style.setProperty("--primary-color", primaryColor);
    root.style.setProperty("--secondary-color", secondaryColor);
    root.style.setProperty("--navbar", navbarColor);
    root.style.setProperty("--border", borderColor);
    modeIcon.classList.toggle("light", lightMode);
    line.forEach((l) => (l.style.background = lineBackground));
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

// Function to toggle scroll lock
function toggleScrollLock(lock) {
  document.body.style.overflow = lock ? "hidden" : "";
}
