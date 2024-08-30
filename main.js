// Mengatur tombol hamburger
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
});

document.addEventListener("click", (event) => {
  if (!navLinks.contains(event.target) && !hamburger.contains(event.target)) {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
  }
});
