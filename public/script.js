const citizenShipInput = document.getElementById("drzavljanstvo");
const countryOfBirthInput = document.getElementById("country-of-birth");
const citySelect = document.getElementById("city-select");
const cityDropdown = document.getElementById("city-dropdown");
const cityInput = document.getElementById("place-input");

citizenShipInput.addEventListener("input", function () {
  countryOfBirthInput.value = citizenShipInput.value;

  if (this.value === "Croatia") {
    cityDropdown.style.display = "block";
    cityInput.style.display = "none";
  } else {
    cityDropdown.style.display = "none";
    cityInput.style.display = "block";
  }
});

countryOfBirthInput.addEventListener("click", function () {
  this.value = "";
  citizenShipInput.addEventListener("click", function () {
    this.value = "";
  });
});

function showCities() {
  fetch("hr.json")
    .then((response) => response.json())
    .then((data) => {
      citySelect.innerHTML = "";

      data.sort((a, b) => a.city.localeCompare(b.city));

      data.forEach((city) => {
        const option = document.createElement("option");
        option.value = city.city;
        option.textContent = city.city;
        citySelect.appendChild(option);
      });
      cityDropdown.style.display = "block";
    })
    .catch((error) => {
      console.error("Error fetching city data: ", error);
    });
}

function checkGuest() {
  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const spol = document.getElementById("spol").value.trim();
  const datum = document.getElementById("datum").value.trim();
  const checkbox = document.getElementById("check-form");

  const drzavljanstvo = document.getElementById("drzavljanstvo").value.trim();
  const countryOfBirth = document
    .getElementById("country-of-birth")
    .value.trim();
  const placeInput = document.getElementById("place-input").value.trim();
  const documentType = document.getElementById("document-type").value.trim();
  const documentNumber = document
    .getElementById("document-number")
    .value.trim();

  // Check if any of the required fields are empty
  if (
    firstName === "" ||
    lastName === "" ||
    spol === "" ||
    datum === "" ||
    drzavljanstvo === "" ||
    countryOfBirth === "" ||
    placeInput === "" ||
    documentType === "" ||
    documentNumber === ""
  ) {
    alert("Please enter all information. Thank you!");
    return false;
  }

  // Check if the date of birth is in the correct format (dd.MM.yyyy)
  const dateOfBirthPattern = /^\d{2}\.\d{2}\.\d{4}\.?$/;

  if (!dateOfBirthPattern.test(datum)) {
    alert("Please enter a valid date of birth in the format dd.MM.yyyy");
    return false;
  }

  if (!checkbox.checked) {
    alert(
      "Please accept the GDPR and privacy policy by checking the checkbox."
    );
    return false;
  }

  return true;
}
