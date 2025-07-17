// Scroll Progress Bar
window.onscroll = () => {
  let scroll = document.documentElement.scrollTop;
  let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  let progress = (scroll / height) * 100;
  document.getElementById('progressBar').style.width = progress + '%';
};

// Auto Footer Year
document.addEventListener("DOMContentLoaded", () => {
  const y = document.getElementById("year");
  if (y) y.innerText = new Date().getFullYear();
});

// Typed.js effect (optional)
if (document.querySelector('.typing')) {
  const typed = new Typed('.typing', {
    strings: ["Business Developer", "CRM Expert", "Digital Marketer", "Learner"],
    typeSpeed: 50,
    backSpeed: 30,
    loop: true
  });
}