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
  const root = document.documentElement;
  let myScreenOrientation = window.screen.orientation;
  let lightMode = false;
  
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;

    const formData = new URLSearchParams();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('message', message);

    
    contactForm.style.display = 'none';
    successMessage.style.display = 'flex';
  
    setTimeout(() => {
      contactForm.style.display = 'block';
      successMessage.style.display = 'none';
    }, 3000);
    
    try {
      const response = await fetch('https://vortex-way.onrender.com/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred. Please try again later.');
    }
    form.reset();
  });
  
  // Scroll to the top of the page on page reload
  window.addEventListener("load", function () {
    video.play();
  });

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

  modeBtn.addEventListener("click", handleModeChange);

  window.addEventListener("scroll", () => {
    const scale = clamp(window.scrollY / 200, 1.5, 3.5);
    console.log(window.scrollY);
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
      video.style.opacity = "0.2";
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

// Function to toggle scroll lock
function toggleScrollLock(lock) {
  document.body.style.overflow = lock ? "hidden" : "";
}