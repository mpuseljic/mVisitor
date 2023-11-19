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
    if (countryOfResidence === "Kroatien") {
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
          alert("Bitte fülle alle Felder aus");
          return;
        }
      }

      const isCityValid = isCityInDatalist(
        personData.cityOfResidence,
        personData.countyOfResidence
      );

      if (!isCityValid) {
        alert(
          "Der eingegebene Ort wurde nicht in der Datenliste gefunden. Bitte wählen Sie einen Ort aus der Datenliste aus."
        );
        return;
      }

      const dobRegex = /^\d{2}\.\d{2}\.\d{4}$/;
      if (!dobRegex.test(personData.dateOfBirth)) {
        alert("Bitte geben Sie ein gültiges Geburtsdatum ein (dd.MM.yyyy)");
        return;
      }

      const checkbox = document.getElementById("check-form");
      if (!checkbox.checked) {
        alert("Bitte akzeptieren Sie die DSGVO und Datenschutzbestimmungen");
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

    alert("Der Check-in ist erledigt!");
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
                    <label for="lastName">Familienname / Prezime </label>
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
                    <label>Geschlecht / Spol </label>
                    <select name="spol" id="spol">
                      <option value="male">Männlich</option>
                      <option value="female">Weiblich</option>
                    </select>
                  </div>
                  <div class="field-form">
                    <label for="date">Geburtsdatum / Datum rođenja </label>
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
                      Nationalität / Državljanstvo{" "}
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
                      <option value="Albanien" />
                      <option value="Algerien" />
                      <option value="Amerikanisch-Samoa" />
                      <option value="Andorra" />
                      <option value="Angola" />
                      <option value="Anguilla" />
                      <option value="Antarktis" />
                      <option value="Antigua und Barbuda" />
                      <option value="Argentinien" />
                      <option value="Armenien" />
                      <option value="Aruba" />
                      <option value="Australien" />
                      <option value="Österreich" />
                      <option value="Aserbaidschan" />
                      <option value="Bahamas" />
                      <option value="Bahrain" />
                      <option value="Bangladesch" />
                      <option value="Barbados" />
                      <option value="Weißrussland" />
                      <option value="Belgien" />
                      <option value="Belize" />
                      <option value="Benin" />
                      <option value="Bermuda" />
                      <option value="Bhutan" />
                      <option value="Bolivien" />
                      <option value="Bosnien und Herzegowina" />
                      <option value="Botswana" />
                      <option value="Bouvetinsel" />
                      <option value="Brasilien" />
                      <option value="Britisches Territorium im Indischen Ozean" />
                      <option value="Brunei Darussalam" />
                      <option value="Bulgarien" />
                      <option value="Burkina Faso" />
                      <option value="Burundi" />
                      <option value="Kambodscha" />
                      <option value="Kamerun" />
                      <option value="Kanada" />
                      <option value="Kap Verde" />
                      <option value="Kaimaninseln" />
                      <option value="Zentralafrikanische Republik" />
                      <option value="Tschad" />
                      <option value="Chile" />
                      <option value="China" />
                      <option value="Weihnachtsinsel" />
                      <option value="Kokosinseln (Keelinginseln)" />
                      <option value="Kolumbien" />
                      <option value="Komoren" />
                      <option value="Kongo" />
                      <option value="Demokratische Republik Kongo" />
                      <option value="Cookinseln" />
                      <option value="Costa Rica" />
                      <option value="Elfenbeinküste" />
                      <option value="Kroatien" />
                      <option value="Kuba" />
                      <option value="Zypern" />
                      <option value="Tschechische Republik" />
                      <option value="Dänemark" />
                      <option value="Dschibuti" />
                      <option value="Dominica" />
                      <option value="Dominikanische Republik" />
                      <option value="Ecuador" />
                      <option value="Ägypten" />
                      <option value="El Salvador" />
                      <option value="Äquatorialguinea" />
                      <option value="Eritrea" />
                      <option value="Estland" />
                      <option value="Äthiopien" />
                      <option value="Falklandinseln (Malwinen)" />
                      <option value="Färöer-Inseln" />
                      <option value="Fidschi" />
                      <option value="Finnland" />
                      <option value="Frankreich" />
                      <option value="Französisch-Guayana" />
                      <option value="Französisch-Polynesien" />
                      <option value="Französische Süd- und Antarktisgebiete" />
                      <option value="Gabun" />
                      <option value="Gambia" />
                      <option value="Georgien" />
                      <option value="Deutschland" />
                      <option value="Ghana" />
                      <option value="Gibraltar" />
                      <option value="Griechenland" />
                      <option value="Grönland" />
                      <option value="Grenada" />
                      <option value="Guadeloupe" />
                      <option value="Guam" />
                      <option value="Guatemala" />
                      <option value="Guinea" />
                      <option value="Guinea-Bissau" />
                      <option value="Guyana" />
                      <option value="Haiti" />
                      <option value="Heard und McDonaldinseln" />
                      <option value="Heiliger Stuhl (Vatikanstadt)" />
                      <option value="Honduras" />
                      <option value="Hongkong" />
                      <option value="Ungarn" />
                      <option value="Island" />
                      <option value="Indien" />
                      <option value="Indonesien" />
                      <option value="Iran, Islamische Republik" />
                      <option value="Irak" />
                      <option value="Irland" />
                      <option value="Israel" />
                      <option value="Italien" />
                      <option value="Jamaika" />
                      <option value="Japan" />
                      <option value="Jordanien" />
                      <option value="Kasachstan" />
                      <option value="Kenia" />
                      <option value="Kiribati" />
                      <option value="Korea, Demokratische Volksrepublik" />
                      <option value="Korea, Republik" />
                      <option value="Kuwait" />
                      <option value="Kirgisistan" />
                      <option value="Laos, Demokratische Volksrepublik" />
                      <option value="Lettland" />
                      <option value="Libanon" />
                      <option value="Lesotho" />
                      <option value="Liberia" />
                      <option value="Libysch-Arabische Dschamahirija" />
                      <option value="Liechtenstein" />
                      <option value="Litauen" />
                      <option value="Luxemburg" />
                      <option value="Macao" />
                      <option value="Mazedonien, Ehemalige Jugoslawische Republik" />
                      <option value="Madagaskar" />
                      <option value="Malawi" />
                      <option value="Malaysia" />
                      <option value="Malediven" />
                      <option value="Mali" />
                      <option value="Malta" />
                      <option value="Marshallinseln" />
                      <option value="Martinique" />
                      <option value="Mauretanien" />
                      <option value="Mauritius" />
                      <option value="Mayotte" />
                      <option value="Mexiko" />
                      <option value="Mikronesien, Föderierte Staaten von" />
                      <option value="Moldau, Republik" />
                      <option value="Monaco" />
                      <option value="Mongolei" />
                      <option value="Montserrat" />
                      <option value="Marokko" />
                      <option value="Mosambik" />
                      <option value="Myanmar" />
                      <option value="Namibia" />
                      <option value="Nauru" />
                      <option value="Nepal" />
                      <option value="Niederlande" />
                      <option value="Niederländische Antillen" />
                      <option value="Neukaledonien" />
                      <option value="Neuseeland" />
                      <option value="Nicaragua" />
                      <option value="Niger" />
                      <option value="Nigeria" />
                      <option value="Niue" />
                      <option value="Norfolkinsel" />
                      <option value="Nördliche Marianen" />
                      <option value="Norwegen" />
                      <option value="Oman" />
                      <option value="Pakistan" />
                      <option value="Palau" />
                      <option value="Palästinensisches Gebiet, Besetztes" />
                      <option value="Panama" />
                      <option value="Papua-Neuguinea" />
                      <option value="Paraguay" />
                      <option value="Peru" />
                      <option value="Philippinen" />
                      <option value="Pitcairn" />
                      <option value="Polen" />
                      <option value="Portugal" />
                      <option value="Puerto Rico" />
                      <option value="Katar" />
                      <option value="Réunion" />
                      <option value="Rumänien" />
                      <option value="Russische Föderation" />
                      <option value="Ruanda" />
                      <option value="St. Helena" />
                      <option value="St. Kitts und Nevis" />
                      <option value="St. Lucia" />
                      <option value="St. Pierre und Miquelon" />
                      <option value="St. Vincent und die Grenadinen" />
                      <option value="Samoa" />
                      <option value="San Marino" />
                      <option value="São Tomé und Príncipe" />
                      <option value="Saudi-Arabien" />
                      <option value="Senegal" />
                      <option value="Serbien und Montenegro" />
                      <option value="Seychellen" />
                      <option value="Sierra Leone" />
                      <option value="Singapur" />
                      <option value="Slowakei" />
                      <option value="Slowenien" />
                      <option value="Salomonen" />
                      <option value="Somalia" />
                      <option value="Südafrika" />
                      <option value="Südgeorgien und die Südlichen Sandwichinseln" />
                      <option value="Spanien" />
                      <option value="Sri Lanka" />
                      <option value="Sudan" />
                      <option value="Suriname" />
                      <option value="Svalbard und Jan Mayen" />
                      <option value="Swasiland" />
                      <option value="Schweden" />
                      <option value="Schweiz" />
                      <option value="Syrische Arabische Republik" />
                      <option value="Taiwan, Provinz China" />
                      <option value="Tadschikistan" />
                      <option value="Tansania, Vereinigte Republik" />
                      <option value="Thailand" />
                      <option value="Osttimor" />
                      <option value="Togo" />
                      <option value="Tokelau" />
                      <option value="Tonga" />
                      <option value="Trinidad und Tobago" />
                      <option value="Tunesien" />
                      <option value="Türkei" />
                      <option value="Turkmenistan" />
                      <option value="Turks- und Caicosinseln" />
                      <option value="Tuvalu" />
                      <option value="Uganda" />
                      <option value="Ukraine" />
                      <option value="Vereinigte Arabische Emirate" />
                      <option value="Vereinigtes Königreich" />
                      <option value="Vereinigte Staaten" />
                      <option value="Kleinere Amerikanische Überseeinseln" />
                      <option value="Uruguay" />
                      <option value="Usbekistan" />
                      <option value="Vanuatu" />
                      <option value="Venezuela" />
                      <option value="Vietnam" />
                      <option value="Britische Jungferninseln" />
                      <option value="Amerikanische Jungferninseln" />
                      <option value="Wallis und Futuna" />
                      <option value="Westsahara" />
                      <option value="Jemen" />
                      <option value="Sambia" />
                      <option value="Simbabwe" />
                    </datalist>
                  </div>
                  <div class="field-form">
                    <label for="country-of-birth">
                      Land des Geburtsorts / Država rođenja{" "}
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
                      Aufenthaltsland / Država prebivališta{" "}
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
                      Wohnort / Mjesto prebivališta{" "}
                    </label>
                    <input
                      id="city-select"
                      name="city-select"
                      value={formDataList[index].cityOfResidence}
                      onChange={(e) => {
                        handleCityOfResidenceChange(e, index);
                      }}
                      list={
                        formDataList[index].countyOfResidence === "Kroatien"
                          ? "cities"
                          : undefined
                      }
                    />
                    {formDataList[index].countyOfResidence === "Kroatien" && (
                      <datalist id="cities">{generateCityOptions()}</datalist>
                    )}
                  </div>

                  <div class="field-form">
                    <label for="document-type">
                      Dokumentart / Vrsta isprave{" "}
                    </label>
                    <select name="document-type" id="document-type">
                      <option value="id">Personalausweis</option>
                      <option value="passport">Passport</option>
                    </select>
                  </div>

                  <div className="field-form">
                    <label htmlFor="document-number">
                      Dokumentennummer / Broj isprave{" "}
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
                        ? "NÄCHSTE PERSON HINZUFÜGEN"
                        : "PERSON ENTFERNEN"}
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
                Ich akzeptiere die DSGVO und die Datenschutzrichtlinien{" "}
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
