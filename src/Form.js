import React from "react";
import { useState, useEffect } from "react";
import citiesData from "./hr.json";

function Form() {
  const [persons, setPersons] = useState([{ id: 1 }]);
  const createPersonData = () => ({
    citizenship: "",
    countryOfBirth: "",
    countyOfResidence: "",
    cityOfResidence: "",
    dateOfBirth: "",
    documentNumber: "",
    firstName: "",
    lastName: "",
  });

  const cityNames = citiesData.map((city) => city.city);

  const [formDataList, setFormDataList] = useState([createPersonData()]);

  useEffect(() => {
    const loadCities = async () => {
      try {
        const response = await fetch("/hr.json");
        const data = await response.json();
        console.log("Cities:", data);
      } catch (error) {
        console.error("Error loading cities: ", error);
      }
    };
    loadCities();
  }, []);

  const generateCityOptions = () => {
    return cityNames.map((cityName, index) => (
      <option key={index} value={cityName} />
    ));
  };

  const handleCitizenshipChange = (e, index) => {
    const selectedCitizenship = e.target.value;
    setFormDataList((prevFormDataList) => {
      const updatedFormDataList = [...prevFormDataList];
      updatedFormDataList[index] = {
        ...updatedFormDataList[index],
        citizenship: selectedCitizenship,
        countryOfBirth: selectedCitizenship,
        countyOfResidence: selectedCitizenship,
      };
      return updatedFormDataList;
    });
  };

  const handleCountryOfResidenceChange = (e, index) => {
    const selectedCountryOfResidence = e.target.value;
    setFormDataList((prevFormDataList) => {
      const updatedFormDataList = [...prevFormDataList];
      updatedFormDataList[index] = {
        ...updatedFormDataList[index],
        countyOfResidence: selectedCountryOfResidence,
      };
      return updatedFormDataList;
    });
  };

  const handleCityOfResidenceChange = (e, index) => {
    const selectedCityOfResidence = e.target.value;

    setFormDataList((prevFormDataList) => {
      const updatedFormDataList = [...prevFormDataList];
      updatedFormDataList[index] = {
        ...updatedFormDataList[index],
        cityOfResidence: selectedCityOfResidence,
      };
      return updatedFormDataList;
    });
  };

  const isCityInDatalist = (city, countryOfResidence) => {
    if (countryOfResidence === "Croatia") {
      const datalist = document.getElementById("cities");

      const options = Array.from(datalist.options);

      return options.some((option) => option.value === city);
    }
    return true;
  };

  const handleCountryOfBirthChange = (e, index) => {
    const selectedCountryOfBirth = e.target.value;
    setFormDataList((prevFormDataList) => {
      const updatedFormDataList = [...prevFormDataList];
      updatedFormDataList[index] = {
        ...updatedFormDataList[index],
        countryOfBirth: selectedCountryOfBirth,
      };
      return updatedFormDataList;
    });
  };

  const handleDateOfBirthChange = (e, index) => {
    let value = e.target.value.replace(/\D/g, "");

    if (e.nativeEvent.inputType === "deleteContentBackward") {
      value = value.slice(0, -1);
    }

    const day = value.slice(0, 2);
    if (parseInt(day, 10) > 31) {
      value = "31" + value.slice(2);
    }

    const month = value.slice(2, 4);
    if (parseInt(month, 10) > 12) {
      value = value.slice(0, 2) + "12" + value.slice(4);
    }

    const currentYear = new Date().getFullYear();
    const year = value.slice(4, 8);
    if (parseInt(year, 10) > currentYear) {
      value = value.slice(0, 4) + currentYear + value.slice(8);
    }

    if (value.length >= 2 && value.charAt(1) !== ".") {
      value = value.slice(0, 2) + "." + value.slice(2);
    }

    if (value.length >= 5 && value.charAt(4) !== ".") {
      value = value.slice(0, 5) + "." + value.slice(5);
    }

    if (value.length > 10) {
      value = value.slice(0, 10);
    }

    setFormDataList((prevFormDataList) => {
      const updatedFormDataList = [...prevFormDataList];
      updatedFormDataList[index] = {
        ...updatedFormDataList[index],
        dateOfBirth: value,
      };
      return updatedFormDataList;
    });
  };

  const MAX_CHAR_LENGTH = 100;

  const handleInputChange = (e, index) => {
    const value = e.target.value.slice(0, MAX_CHAR_LENGTH);
    setFormDataList((prevFormDataList) => {
      const updatedFormDataList = [...prevFormDataList];
      updatedFormDataList[index] = {
        ...updatedFormDataList[index],
        citizenship: value,
        countryOfBirth: value,
        countyOfResidence: value,
        cityOfResidence: "",
      };
      return updatedFormDataList;
    });
  };

  const handleNameInput = (e, index) => {
    const value = e.target.value.slice(0, MAX_CHAR_LENGTH);
    setFormDataList((prevFormDataList) => {
      const updatedFormDataList = [...prevFormDataList];
      updatedFormDataList[index] = {
        ...updatedFormDataList[index],
        firstName: value,
      };
      return updatedFormDataList;
    });
  };

  const handleLastnameInput = (e, index) => {
    const value = e.target.value.slice(0, MAX_CHAR_LENGTH);
    setFormDataList((prevFormDataList) => {
      const updatedFormDataList = [...prevFormDataList];
      updatedFormDataList[index] = {
        ...updatedFormDataList[index],
        lastName: value,
      };
      return updatedFormDataList;
    });
  };

  const handleDocumentNumberChange = (e, index) => {
    const value = e.target.value.slice(0, 16);
    setFormDataList((prevFormDataList) => {
      const updatedFormDataList = [...prevFormDataList];
      updatedFormDataList[index] = {
        ...updatedFormDataList[index],
        documentNumber: value,
      };
      return updatedFormDataList;
    });
  };

  const handleAddPerson = (e) => {
    e.preventDefault();
    if (persons.length < 10) {
      setPersons((prevPersons) => {
        const newPerson = { id: prevPersons.length + 1 };
        return [...prevPersons, newPerson];
      });

      setFormDataList((prevFormDataList) => [
        ...prevFormDataList,
        createPersonData(),
      ]);
    }
  };

  const handleRemovePerson = (e) => {
    e.preventDefault();
    if (persons.length > 1) {
      setPersons((prevPersons) => prevPersons.slice(0, -1));
      setFormDataList((prevFormDataList) => prevFormDataList.slice(0, -1));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const jsonDataList = [];

    for (let i = 0; i < formDataList.length; i++) {
      const personData = formDataList[i];

      for (const key in personData) {
        if (personData[key] === "") {
          alert("Please fill out all fields");
          return;
        }
      }

      const isCityValid = isCityInDatalist(
        personData.cityOfResidence,
        personData.countyOfResidence
      );

      if (!isCityValid) {
        alert(
          "Uneseni grad nije pronađen u datalistu. Molimo odaberite grad iz datalista."
        );
        return;
      }

      const dobRegex = /^\d{2}\.\d{2}\.\d{4}$/;
      if (!dobRegex.test(personData.dateOfBirth)) {
        alert("Please enter a valid date of birth (dd.MM.yyyy)");
        return;
      }

      const checkbox = document.getElementById("check-form");
      if (!checkbox.checked) {
        alert("Please accept the GDPR and privacy policy");
        return;
      }

      const jsonPerson = {
        id: i + 1,
        firstName: personData.firstName,
        lastName: personData.lastName,
        gender: document.getElementById("spol").value,
        dateOfBirth: personData.dateOfBirth,
        citizenship: personData.citizenship,
        countryOfBirth: personData.countryOfBirth,
        countyOfResidence: personData.countyOfResidence,
        cityOfResidence: personData.cityOfResidence,
        documentType: document.getElementById("document-type").value,
        documentNumber: personData.documentNumber,
      };

      jsonDataList.push(jsonPerson);
    }

    const existingData = JSON.parse(localStorage.getItem("checkin_data")) || [];

    const combinedData = [...existingData, ...jsonDataList];

    localStorage.setItem("checkin_data", JSON.stringify(combinedData));

    console.log(combinedData);

    alert("Check-in is done!");
  };

  return (
    <main>
      <div className="second-container">
        {persons.map((person, index) => (
          <div key={person.id} className="form-container">
            <form id={`form-${person.id}`}>
              <div className="fields-form">
                <div className="person-1">
                  <div className="field-form">
                    <label htmlFor="firstName" style={{ fontSize: "23px" }}>
                      <u>{`PERSON ${person.id}`}</u>
                    </label>
                  </div>
                  <div className="field-form">
                    <label htmlFor="firstName">Name / Ime </label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      placeholder=""
                      value={formDataList[index].firstName}
                      onChange={(e) => handleNameInput(e, index)}
                    />
                  </div>
                  <div class="field-form">
                    <label for="lastName">Lastname / Prezime </label>
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      placeholder
                      value={formDataList[index].lastName}
                      onChange={(e) => handleLastnameInput(e, index)}
                    />
                  </div>
                  <div class="field-form">
                    <label>Gender / Spol </label>
                    <select name="spol" id="spol">
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                  <div class="field-form">
                    <label for="date">Date of birth / Datum rođenja </label>
                    <input
                      type="text"
                      name="datum"
                      id="datum"
                      placeholder="dd.MM.yyyy"
                      value={formDataList[index].dateOfBirth}
                      onChange={(e) => handleDateOfBirthChange(e, index)}
                    />
                  </div>
                  <div class="field-form">
                    <label for="citizenship">
                      Citizenship / Državljanstvo{" "}
                    </label>
                    <input
                      type="text"
                      name="drzavljanstvo"
                      id="drzavljanstvo"
                      list="countries"
                      value={formDataList[index].citizenship}
                      onChange={(e) => {
                        handleCitizenshipChange(e, index);
                        handleInputChange(e, index);
                      }}
                    />
                    <datalist id="countries">
                      <option value="Afghanistan" />
                      <option value="Albania" />
                      <option value="Algeria" />
                      <option value="American Samoa" />
                      <option value="Andorra" />
                      <option value="Angola" />
                      <option value="Anguilla" />
                      <option value="Antarctica" />
                      <option value="Antigua and Barbuda" />
                      <option value="Argentina" />
                      <option value="Armenia" />
                      <option value="Aruba" />
                      <option value="Australia" />
                      <option value="Austria" />
                      <option value="Azerbaijan" />
                      <option value="Bahamas" />
                      <option value="Bahrain" />
                      <option value="Bangladesh" />
                      <option value="Barbados" />
                      <option value="Belarus" />
                      <option value="Belgium" />
                      <option value="Belize" />
                      <option value="Benin" />
                      <option value="Bermuda" />
                      <option value="Bhutan" />
                      <option value="Bolivia" />
                      <option value="Bosnia and Herzegovina" />
                      <option value="Botswana" />
                      <option value="Bouvet Island" />
                      <option value="Brazil" />
                      <option value="British Indian Ocean Territory" />
                      <option value="Brunei Darussalam" />
                      <option value="Bulgaria" />
                      <option value="Burkina Faso" />
                      <option value="Burundi" />
                      <option value="Cambodia" />
                      <option value="Cameroon" />
                      <option value="Canada" />
                      <option value="Cape Verde" />
                      <option value="Cayman Islands" />
                      <option value="Central African Republic" />
                      <option value="Chad" />
                      <option value="Chile" />
                      <option value="China" />
                      <option value="Christmas Island" />
                      <option value="Cocos (Keeling) Islands" />
                      <option value="Colombia" />
                      <option value="Comoros" />
                      <option value="Congo" />
                      <option value="Congo, The Democratic Republic of The" />
                      <option value="Cook Islands" />
                      <option value="Costa Rica" />
                      <option value="Cote D'ivoire" />
                      <option value="Croatia" />
                      <option value="Cuba" />
                      <option value="Cyprus" />
                      <option value="Czech Republic" />
                      <option value="Denmark" />
                      <option value="Djibouti" />
                      <option value="Dominica" />
                      <option value="Dominican Republic" />
                      <option value="Ecuador" />
                      <option value="Egypt" />
                      <option value="El Salvador" />
                      <option value="Equatorial Guinea" />
                      <option value="Eritrea" />
                      <option value="Estonia" />
                      <option value="Ethiopia" />
                      <option value="Falkland Islands (Malvinas)" />
                      <option value="Faroe Islands" />
                      <option value="Fiji" />
                      <option value="Finland" />
                      <option value="France" />
                      <option value="French Guiana" />
                      <option value="French Polynesia" />
                      <option value="French Southern Territories" />
                      <option value="Gabon" />
                      <option value="Gambia" />
                      <option value="Georgia" />
                      <option value="Germany" />
                      <option value="Ghana" />
                      <option value="Gibraltar" />
                      <option value="Greece" />
                      <option value="Greenland" />
                      <option value="Grenada" />
                      <option value="Guadeloupe" />
                      <option value="Guam" />
                      <option value="Guatemala" />
                      <option value="Guinea" />
                      <option value="Guinea-bissau" />
                      <option value="Guyana" />
                      <option value="Haiti" />
                      <option value="Heard Island and Mcdonald Islands" />
                      <option value="Holy See (Vatican City State)" />
                      <option value="Honduras" />
                      <option value="Hong Kong" />
                      <option value="Hungary" />
                      <option value="Iceland" />
                      <option value="India" />
                      <option value="Indonesia" />
                      <option value="Iran, Islamic Republic of" />
                      <option value="Iraq" />
                      <option value="Ireland" />
                      <option value="Israel" />
                      <option value="Italy" />
                      <option value="Jamaica" />
                      <option value="Japan" />
                      <option value="Jordan" />
                      <option value="Kazakhstan" />
                      <option value="Kenya" />
                      <option value="Kiribati" />
                      <option value="Korea, Democratic People's Republic of" />
                      <option value="Korea, Republic of" />
                      <option value="Kuwait" />
                      <option value="Kyrgyzstan" />
                      <option value="Lao People's Democratic Republic" />
                      <option value="Latvia" />
                      <option value="Lebanon" />
                      <option value="Lesotho" />
                      <option value="Liberia" />
                      <option value="Libyan Arab Jamahiriya" />
                      <option value="Liechtenstein" />
                      <option value="Lithuania" />
                      <option value="Luxembourg" />
                      <option value="Macao" />
                      <option value="Macedonia, The Former Yugoslav Republic of" />
                      <option value="Madagascar" />
                      <option value="Malawi" />
                      <option value="Malaysia" />
                      <option value="Maldives" />
                      <option value="Mali" />
                      <option value="Malta" />
                      <option value="Marshall Islands" />
                      <option value="Martinique" />
                      <option value="Mauritania" />
                      <option value="Mauritius" />
                      <option value="Mayotte" />
                      <option value="Mexico" />
                      <option value="Micronesia, Federated States of" />
                      <option value="Moldova, Republic of" />
                      <option value="Monaco" />
                      <option value="Mongolia" />
                      <option value="Montserrat" />
                      <option value="Morocco" />
                      <option value="Mozambique" />
                      <option value="Myanmar" />
                      <option value="Namibia" />
                      <option value="Nauru" />
                      <option value="Nepal" />
                      <option value="Netherlands" />
                      <option value="Netherlands Antilles" />
                      <option value="New Caledonia" />
                      <option value="New Zealand" />
                      <option value="Nicaragua" />
                      <option value="Niger" />
                      <option value="Nigeria" />
                      <option value="Niue" />
                      <option value="Norfolk Island" />
                      <option value="Northern Mariana Islands" />
                      <option value="Norway" />
                      <option value="Oman" />
                      <option value="Pakistan" />
                      <option value="Palau" />
                      <option value="Palestinian Territory, Occupied" />
                      <option value="Panama" />
                      <option value="Papua New Guinea" />
                      <option value="Paraguay" />
                      <option value="Peru" />
                      <option value="Philippines" />
                      <option value="Pitcairn" />
                      <option value="Poland" />
                      <option value="Portugal" />
                      <option value="Puerto Rico" />
                      <option value="Qatar" />
                      <option value="Reunion" />
                      <option value="Romania" />
                      <option value="Russian Federation" />
                      <option value="Rwanda" />
                      <option value="Saint Helena" />
                      <option value="Saint Kitts and Nevis" />
                      <option value="Saint Lucia" />
                      <option value="Saint Pierre and Miquelon" />
                      <option value="Saint Vincent and The Grenadines" />
                      <option value="Samoa" />
                      <option value="San Marino" />
                      <option value="Sao Tome and Principe" />
                      <option value="Saudi Arabia" />
                      <option value="Senegal" />
                      <option value="Serbia and Montenegro" />
                      <option value="Seychelles" />
                      <option value="Sierra Leone" />
                      <option value="Singapore" />
                      <option value="Slovakia" />
                      <option value="Slovenia" />
                      <option value="Solomon Islands" />
                      <option value="Somalia" />
                      <option value="South Africa" />
                      <option value="South Georgia and The South Sandwich Islands" />
                      <option value="Spain" />
                      <option value="Sri Lanka" />
                      <option value="Sudan" />
                      <option value="Suriname" />
                      <option value="Svalbard and Jan Mayen" />
                      <option value="Swaziland" />
                      <option value="Sweden" />
                      <option value="Switzerland" />
                      <option value="Syrian Arab Republic" />
                      <option value="Taiwan, Province of China" />
                      <option value="Tajikistan" />
                      <option value="Tanzania, United Republic of" />
                      <option value="Thailand" />
                      <option value="Timor-leste" />
                      <option value="Togo" />
                      <option value="Tokelau" />
                      <option value="Tonga" />
                      <option value="Trinidad and Tobago" />
                      <option value="Tunisia" />
                      <option value="Turkey" />
                      <option value="Turkmenistan" />
                      <option value="Turks and Caicos Islands" />
                      <option value="Tuvalu" />
                      <option value="Uganda" />
                      <option value="Ukraine" />
                      <option value="United Arab Emirates" />
                      <option value="United Kingdom" />
                      <option value="United States" />
                      <option value="United States Minor Outlying Islands" />
                      <option value="Uruguay" />
                      <option value="Uzbekistan" />
                      <option value="Vanuatu" />
                      <option value="Venezuela" />
                      <option value="Viet Nam" />
                      <option value="Virgin Islands, British" />
                      <option value="Virgin Islands, U.S" />
                      <option value="Wallis and Futuna" />
                      <option value="Western Sahara" />
                      <option value="Yemen" />
                      <option value="Zambia" />
                      <option value="Zimbabwe" />
                    </datalist>
                  </div>
                  <div class="field-form">
                    <label for="country-of-birth">
                      Country of birth / Država rođenja{" "}
                    </label>
                    <input
                      type="text"
                      name="country-of-birth"
                      id="country-of-birth"
                      list="countries"
                      value={formDataList[index].countryOfBirth}
                      onChange={(e) => handleCountryOfBirthChange(e, index)}
                    />
                  </div>
                  <div class="field-form">
                    <label for="country-of-residence">
                      Country of residence / Država prebivališta{" "}
                    </label>
                    <input
                      type="text"
                      name="country-of-residence"
                      id="country-of-residence"
                      list="countries"
                      value={formDataList[index].countyOfResidence}
                      onChange={(e) => handleCountryOfResidenceChange(e, index)}
                    />
                  </div>
                  <div className="field-form">
                    <label htmlFor="city-select">
                      Place of residence / Mjesto prebivališta{" "}
                    </label>
                    <input
                      id="city-select"
                      name="city-select"
                      value={formDataList[index].cityOfResidence}
                      onChange={(e) => {
                        handleCityOfResidenceChange(e, index);
                      }}
                      list={
                        formDataList[index].countyOfResidence === "Croatia"
                          ? "cities"
                          : undefined
                      }
                    />
                    {formDataList[index].countyOfResidence === "Croatia" && (
                      <datalist id="cities">{generateCityOptions()}</datalist>
                    )}
                  </div>

                  <div class="field-form">
                    <label for="document-type">
                      Document type / Vrsta isprave{" "}
                    </label>
                    <select name="document-type" id="document-type">
                      <option value="id">ID</option>
                      <option value="passport">Passport</option>
                    </select>
                  </div>

                  <div className="field-form">
                    <label htmlFor="document-number">
                      Document number / Broj isprave{" "}
                    </label>
                    <input
                      type="text"
                      name="document-number"
                      id="document-number"
                      value={formDataList[index].documentNumber}
                      onChange={(e) => handleDocumentNumberChange(e, index)}
                    />
                  </div>
                  <p className="for-button" style={{ paddingBottom: "15px" }}>
                    <button
                      id={`toggle-person-${person.id}`}
                      className="form-btn"
                      onClick={(e) => {
                        if (
                          persons.length < 10 &&
                          index === persons.length - 1
                        ) {
                          handleAddPerson(e);
                        } else {
                          handleRemovePerson(e);
                        }
                      }}
                    >
                      {index === persons.length - 1
                        ? "ADD NEXT PERSON"
                        : "REMOVE PERSON"}
                    </button>
                  </p>
                </div>
              </div>
            </form>
          </div>
        ))}
        <div className="accept-form">
          <div className="checkbox" style={{ marginBottom: "60px" }}>
            <label htmlFor="check-form">
              <input type="checkbox" name="check-form" id="check-form" />
              <span className="text">
                I accept the GDPR and privacy policy{" "}
              </span>
            </label>
          </div>

          <p className="check-in">
            <button id="submit" className="submit" onClick={handleSubmit}>
              CHECK-IN
            </button>
          </p>
        </div>
      </div>
    </main>
  );
}

export default Form;
