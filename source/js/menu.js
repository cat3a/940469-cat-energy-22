const navMain = document.querySelector(".main-nav");
const navToggle = document.querySelector(".main-nav__toggle");
const siteList = document.querySelector(".site-list");

navMain.classList.remove("main-nav--no-js");
navMain.classList.remove("main-nav--opened");
navMain.classList.add("main-nav--closed");
siteList.classList.add("site-list--js");

navToggle.addEventListener("click", function () {
  navMain.classList.toggle("main-nav--closed");
  navMain.classList.toggle("main-nav--opened");
});
