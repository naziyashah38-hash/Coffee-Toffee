const modal = document.getElementById("signupModal");
const btn = document.querySelector(".sign-up button");
const closeBtn = document.querySelector(".close-btn");

btn.onclick = (e) => {
  e.preventDefault();
  modal.style.display = "block";
}
closeBtn.onclick = () => {
  modal.style.display = "none";
}
window.onclick = (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// contact us

const modal2 = document.getElementById("contactModal");
const btn2 = document.querySelector(".contact-us");
const closeBtn2 = document.querySelectorAll(".close-btn")[1];

btn2.onclick = (e) => {
  e.preventDefault();
  modal2.style.display = "block";
}
closeBtn2.onclick = () => {
  modal2.style.display = "none";
}
window.onclick = (event) => {
  if (event.target == modal2) {
    modal2.style.display = "none";
  }
}

function scrollToTop(){
  window.scrollTo({
    top:0,
    behavior:'smooth'
  });
}

