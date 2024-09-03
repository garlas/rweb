// Mengatur tombol hamburger
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
});

// Menutup menu jika mengklik di luar area menu atau tombol hamburger
document.addEventListener("click", (event) => {
  if (!navLinks.contains(event.target) && !hamburger.contains(event.target)) {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
  }
});

// Menutup menu jika salah satu tautan diklik
const navItems = document.querySelectorAll(".nav-list li a");

navItems.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
  });
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

// login.js
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector("#loginForm");
  const errorMessage = document.querySelector("#error-message");

  // Tentukan username dan password yang diizinkan
  const validUsername = "1";
  const validPassword = "1";

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Mencegah pengiriman form default

    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;

    // Memeriksa apakah username dan password sesuai
    if (username === validUsername && password === validPassword) {
      window.location.href = "dashboard.html"; // halaman dashboard
    } else {
      errorMessage.textContent = "Password salah. Silakan coba lagi.";
      errorMessage.style.display = "block";
    }
  });
});

// animasi skroll halaman
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});
