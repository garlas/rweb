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

// animasi
document.addEventListener("DOMContentLoaded", function () {
  var tentangKami = document.querySelector(".tentang-kami");

  function showTentangKami() {
    if (tentangKami.getBoundingClientRect().top < window.innerHeight) {
      tentangKami.classList.add("visible");
      window.removeEventListener("scroll", showTentangKami);
    }
  }

  window.addEventListener("scroll", showTentangKami);
  showTentangKami(); // Check immediately if the section is in view
});
