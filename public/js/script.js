console.log("client side from script.js");

const locationForm = document.querySelector("form");
const searchField = document.querySelector("input#searchField");

const successMessage = document.querySelector(".message1");
const errorMessage = document.querySelector(".message2");

successMessage.textContent = "";
errorMessage.textContent = "";

locationForm.addEventListener("submit", function (e) {
  successMessage.textContent = "loading...";
  e.preventDefault();
  console.log("http://localhost:3000/weather?address=" + searchField.value);
  fetch("http://localhost:3000/weather?address=" + searchField.value).then(
    (response) => {
      successMessage.textContent = "";
      errorMessage.textContent = "";
      response.json().then((data) => {
        if (data.error) {
          errorMessage.textContent = data.error;
        } else {
          errorMessage.textContent = data.forcast;
          successMessage.textContent = data.place;
        }
      });
    }
  );
});
