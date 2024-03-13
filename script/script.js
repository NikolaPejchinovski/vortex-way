document.addEventListener("DOMContentLoaded", function () {
  const modeBtn = document.querySelector(".mode-switch");
  const logo = document.querySelector(".logo");
  const nav = document.querySelector("header nav");
  const video = document.getElementById("bg-video");
  const usMap = document.querySelector(".container .left img");
  const modeIcon = document.querySelector(".mode-switch .icon");
  const line = document.querySelectorAll(".line");
  const root = document.documentElement;
  // var Scrollbar = window.Scrollbar;
  let lightMode = false;

  // Scrollbar.init(document.querySelector("#my-scrollbar"));
  modeBtn.addEventListener("click", handleModeChange);

  window.addEventListener("scroll", () => {
    const scale = Math.max(1, window.scrollY / 200);
    console.log(scale);
    if (window.scrollY > 100) {
      video.style.transform = `scale(${scale})`;
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
    if (window.scrollY > 400) {
      video.classList.add("scrolled");
    } else {
      video.classList.remove("scrolled");
    }
  });

  function handleModeChange() {
    lightMode = !lightMode;
    if (lightMode) {
      line.forEach((l) => (l.style.background = "rgba(0, 0, 0, 0.2)"));
      logo.classList.add("invert");
      usMap.classList.add("invert");
      video.classList.add("invert");
      root.style.setProperty("--primary-color", "#e8e8e8");
      root.style.setProperty("--secondary-color", "#080808");
      root.style.setProperty("--navbar", "#FFFFFF");
      modeIcon.classList.add("light");
    } else {
      line.forEach((l) => (l.style.background = "rgba(255, 255, 255, 0.1)"));
      logo.classList.remove("invert");
      usMap.classList.remove("invert");
      video.classList.remove("invert");
      root.style.setProperty("--primary-color", "#080808");
      root.style.setProperty("--secondary-color", "#e8e8e8");
      root.style.setProperty("--navbar", "#131313");
      modeIcon.classList.remove("light");
    }
  }
});
