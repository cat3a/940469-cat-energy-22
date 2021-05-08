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

const was = document.querySelector(".example__button--was");
const became = document.querySelector(".example__button--became");
const thin = document.querySelector(".example__thin-cat");
const fat = document.querySelector(".example__fat-cat");
const example = document.querySelector(".example");
const exampleContainer = document.querySelector(".example__container");
const definition = document.querySelectorAll(".example__definition");

was.addEventListener("click", function () {
  if (thin.classList.contains("example__thin-cat--show")) {
    thin.classList.remove("example__thin-cat--show");
  }

  if (fat.classList.contains("example__fat-cat--hide")) {
    fat.classList.remove("example__fat-cat--hide");
  }

  if (example.classList.contains("example--thin-cat")) {
    example.classList.remove("example--thin-cat");
    exampleContainer.classList.remove("example__container--thin-cat");
  }

  thin.classList.add("example__thin-cat--hide");
  fat.classList.add("example__fat-cat--show");
  example.classList.add("example--fat-cat");
  exampleContainer.classList.add("example__container--fat-cat");
  exampleContainer.classList.remove("example__container--color");

  for (let def of definition) {
    def.classList.remove("example__definition--thin-cat");
  }
});

became.addEventListener("click", function () {
  if (thin.classList.contains("example__thin-cat--hide")) {
    thin.classList.remove("example__thin-cat--hide");
  }

  if (fat.classList.contains("example__fat-cat--show")) {
    fat.classList.remove("example__fat-cat--show");
  }

  if (example.classList.contains("example--fat-cat")) {
    example.classList.remove("example--fat-cat");
    exampleContainer.classList.remove("example__container--fat-cat");
  }

  for (let def of definition) {
    def.classList.add("example__definition--thin-cat");
  }

thin.classList.add("example__thin-cat--show");
fat.classList.add("example__fat-cat--hide");
example.classList.add("example--thin-cat");
exampleContainer.classList.add("example__container--thin-cat");
exampleContainer.classList.remove("example__container--color");
});
