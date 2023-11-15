import React from "react";
import { useState, useEffect } from "react";

function GermanForm() {
  const [persons, setPersons] = useState([{ id: 1 }]);
  const [isDocumentNumberValid, setIsDocumentNumberValid] = useState(true);
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

  const [formDataList, setFormDataList] = useState([createPersonData()]);
  const [residenceFields, setResidenceFields] = useState([""]);

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

  const handleResidenceFieldChange = (e, index) => {
    const value = e.target.value;
    setResidenceFields((prevResidenceFields) => {
      const updatedResidenceFields = [...prevResidenceFields];
      updatedResidenceFields[index] = value;
      return updatedResidenceFields;
    });
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
    let value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters

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
        cityOfResidence: value,
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
    setIsDocumentNumberValid(value.length === 16);
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

    localStorage.setItem("checkin_data", JSON.stringify(jsonDataList));
    console.log(jsonDataList);

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
                    <label for="date">Geburtsdatum / Datum rođenja</label>
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
                  {formDataList[index].countyOfResidence === "Croatia" ? (
                    <div className="field-form">
                      <label htmlFor="city-select">
                        Wohnort / Mjesto prebivališta{" "}
                      </label>
                      <select
                        id="city-select"
                        name="city-select"
                        value={formDataList[index].cityOfResidence}
                        onChange={(e) => {
                          handleCityOfResidenceChange(e, index);
                        }}
                      >
                        <option value="" disabled>
                          Select city{" "}
                        </option>
                        <option value="Andrijaševci">Andrijaševci</option>
                        <option value="Antunovac">Antunovac</option>
                        <option value="Babina Greda">Babina Greda</option>
                        <option value="Baška Voda">Baška Voda</option>
                        <option value="Bakar">Bakar</option>
                        <option value="Bedenica">Bedenica</option>
                        <option value="Beretinec">Beretinec</option>
                        <option value="Bilice">Bilice</option>
                        <option value="Bizovac">Bizovac</option>
                        <option value="Bogdanovci">Bogdanovci</option>
                        <option value="Bol">Bol</option>
                        <option value="Brela">Brela</option>
                        <option value="Bribir">Bribir</option>
                        <option value="Brodski Stupnik">Brodski Stupnik</option>
                        <option value="Brtonigla">Brtonigla</option>
                        <option value="Budenec">Budenec</option>
                        <option value="Budinšćina">Budinšćina</option>
                        <option value="Bukovlje">Bukovlje</option>
                        <option value="Bedekovčina">Bedekovčina</option>
                        <option value="Beli Manastir">Beli Manastir</option>
                        <option value="Belišće">Belišće</option>
                        <option value="Biograd na Moru">Biograd na Moru</option>
                        <option value="Bjelovar">Bjelovar</option>
                        <option value="Borovo">Borovo</option>
                        <option value="Brckovljani">Brckovljani</option>
                        <option value="Buje">Buje</option>
                        <option value="Buzet">Buzet</option>
                        <option value="Cestica">Cestica</option>
                        <option value="Cavtat">Cavtat</option>
                        <option value="Cerna">Cerna</option>
                        <option value="Cernik">Cernik</option>
                        <option value="Crikvenica">Crikvenica</option>
                        <option value="Čakovec">Čakovec</option>
                        <option value="Čazma">Čazma</option>
                        <option value="Čavle">Čavle</option>
                        <option value="Čepin">Čepin</option>
                        <option value="Delnice">Delnice</option>
                        <option value="Desinić">Desinić</option>
                        <option value="Dekanovec">Dekanovec</option>
                        <option value="Dobrinj">Dobrinj</option>
                        <option value="Donja Dubrava">Donja Dubrava</option>
                        <option value="Donja Motičina">Donja Motičina</option>
                        <option value="Donji Andrijevci">
                          Donji Andrijevci
                        </option>
                        <option value="Donji Proložac">Donji Proložac</option>
                        <option value="Donji Seget">Donji Seget</option>
                        <option value="Donji Vidovec">Donji Vidovec</option>
                        <option value="Domašinec">Domašinec</option>
                        <option value="Dragalić">Dragalić</option>
                        <option value="Draganići">Draganići</option>
                        <option value="Drenje">Drenje</option>
                        <option value="Drenovci">Drenovci</option>
                        <option value="Dubrava">Dubrava</option>
                        <option value="Donja Stubica">Donja Stubica</option>
                        <option value="Donji Kraljevec">Donji Kraljevec</option>
                        <option value="Donji Miholjac">Donji Miholjac</option>
                        <option value="Drniš">Drniš</option>
                        <option value="Dubrovnik">Dubrovnik</option>
                        <option value="Duga Resa">Duga Resa</option>
                        <option value="Dugi Rat">Dugi Rat</option>
                        <option value="Dugopolje">Dugopolje</option>
                        <option value="Đakovo">Đakovo</option>
                        <option value="Đurđevac">Đurđevac</option>
                        <option value="Ðelekovec">Ðelekovec</option>
                        <option value="Ðurđenovac">Ðurđenovac</option>
                        <option value="Erdut">Erdut</option>
                        <option value="Ernestinovo">Ernestinovo</option>
                        <option value="Farkaševac">Farkaševac</option>
                        <option value="Ferdinandovac">Ferdinandovac</option>
                        <option value="Garešnica">Garešnica</option>
                        <option value="Galovac">Galovac</option>
                        <option value="Generalski Stol">Generalski Stol</option>
                        <option value="Gola">Gola</option>
                        <option value="Gorjani">Gorjani</option>
                        <option value="Gradec">Gradec</option>
                        <option value="Gradina">Gradina</option>
                        <option value="Gračišće">Gračišće</option>
                        <option value="Gornja Motičina">Gornja Motičina</option>
                        <option value="Gornja Rijeka">Gornja Rijeka</option>
                        <option value="Gornja Stubica">Gornja Stubica</option>
                        <option value="Gornje Jesenje">Gornje Jesenje</option>
                        <option value="Gornji Bogičevci">
                          Gornji Bogičevci
                        </option>
                        <option value="Gornji Stupnik">Gornji Stupnik</option>
                        <option value="Grohote">Grohote</option>
                        <option value="Grubišno Polje">Grubišno Polje</option>
                        <option value="Gundinci">Gundinci</option>
                        <option value="Gospić">Gospić</option>
                        <option value="Gradac">Gradac</option>
                        <option value="Gornji Kneginec">Gornji Kneginec</option>
                        <option value="Goričan">Goričan</option>
                        <option value="Gradište">Gradište</option>
                        <option value="Gunja">Gunja</option>
                        <option value="Hercegovac">Hercegovac</option>
                        <option value="Hlebine">Hlebine</option>
                        <option value="Hum na Sutli">Hum na Sutli</option>
                        <option value="Hrašćina">Hrašćina</option>
                        <option value="Hvar">Hvar</option>
                        <option value="Hrvatska Kostajnica">
                          Hrvatska Kostajnica
                        </option>
                        <option value="Ilok">Ilok</option>
                        <option value="Imotski">Imotski</option>
                        <option value="Ivanec">Ivanec</option>
                        <option value="Ivankovo">Ivankovo</option>
                        <option value="Ivanić-Grad">Ivanić-Grad</option>
                        <option value="Jakovlje">Jakovlje</option>
                        <option value="Jakšić">Jakšić</option>
                        <option value="Jarmina">Jarmina</option>
                        <option value="Jalžabet">Jalžabet</option>
                        <option value="Jastrebarsko">Jastrebarsko</option>
                        <option value="Jelenje">Jelenje</option>
                        <option value="Josipdol">Josipdol</option>
                        <option value="Jurdani">Jurdani</option>
                        <option value="Karanac">Karanac</option>
                        <option value="Kalanj">Kalanj</option>
                        <option value="Kalnik">Kalnik</option>
                        <option value="Kamanje">Kamanje</option>
                        <option value="Kapela">Kapela</option>
                        <option value="Kaptol">Kaptol</option>
                        <option value="Karanac">Karanac</option>
                        <option value="Karojba">Karojba</option>
                        <option value="Kaštel Sućurac">Kaštel Sućurac</option>
                        <option value="Kaštelir">Kaštelir</option>
                        <option value="Klanjec">Klanjec</option>
                        <option value="Klenovnik">Klenovnik</option>
                        <option value="Klinča Sela">Klinča Sela</option>
                        <option value="Kloštar Podravski">
                          Kloštar Podravski
                        </option>
                        <option value="Klakar">Klakar</option>
                        <option value="Klis">Klis</option>
                        <option value="Kneževi Vinogradi">
                          Kneževi Vinogradi
                        </option>
                        <option value="Kolan">Kolan</option>
                        <option value="Končanica">Končanica</option>
                        <option value="Konjšćina">Konjšćina</option>
                        <option value="Koprivnički Bregi">
                          Koprivnički Bregi
                        </option>
                        <option value="Koprivnički Ivanec">
                          Koprivnički Ivanec
                        </option>
                        <option value="Korčula">Korčula</option>
                        <option value="Kotlenice">Kotlenice</option>
                        <option value="Kovačevac">Kovačevac</option>
                        <option value="Kovačica">Kovačica</option>
                        <option value="Krašić">Krašić</option>
                        <option value="Kraljevec na Sutli">
                          Kraljevec na Sutli
                        </option>
                        <option value="Krapinske Toplice">
                          Krapinske Toplice
                        </option>
                        <option value="Krasica">Krasica</option>
                        <option value="Kremena">Kremena</option>
                        <option value="Križ">Križ</option>
                        <option value="Kukljica">Kukljica</option>
                        <option value="Kula Norinska">Kula Norinska</option>
                        <option value="Kutjevo">Kutjevo</option>
                        <option value="Karlovac">Karlovac</option>
                        <option value="Kaštel Stari">Kaštel Stari</option>
                        <option value="Kastav">Kastav</option>
                        <option value="Kistanje">Kistanje</option>
                        <option value="Kloštar Ivanić">Kloštar Ivanić</option>
                        <option value="Knin">Knin</option>
                        <option value="Koprivnica">Koprivnica</option>
                        <option value="Korčula">Korčula</option>
                        <option value="Kostrena">Kostrena</option>
                        <option value="Kotoriba">Kotoriba</option>
                        <option value="Kozarska Dubica">Kozarska Dubica</option>
                        <option value="Kraljevica">Kraljevica</option>
                        <option value="Krapina">Krapina</option>
                        <option value="Kršan">Kršan</option>
                        <option value="Križ">Križ</option>
                        <option value="Križevci">Križevci</option>
                        <option value="Kutina">Kutina</option>
                        <option value="Ližnjan">Ližnjan</option>
                        <option value="Lekenik">Lekenik</option>
                        <option value="Lipik">Lipik</option>
                        <option value="Lobor">Lobor</option>
                        <option value="Lopar">Lopar</option>
                        <option value="Lopatinec">Lopatinec</option>
                        <option value="Lovas">Lovas</option>
                        <option value="Luka">Luka</option>
                        <option value="Lukač">Lukač</option>
                        <option value="Lumbarda">Lumbarda</option>
                        <option value="Lumbarda">Lumbarda</option>
                        <option value="Lovran">Lovran</option>
                        <option value="Ludbreg">Ludbreg</option>
                        <option value="Makarska">Makarska</option>
                        <option value="Mala Subotica">Mala Subotica</option>
                        <option value="Marčana">Marčana</option>
                        <option value="Martijanec">Martijanec</option>
                        <option value="Martinska Ves">Martinska Ves</option>
                        <option value="Matulji">Matulji</option>
                        <option value="Malinska">Malinska</option>
                        <option value="Marina">Marina</option>
                        <option value="Marija Gorica">Marija Gorica</option>
                        <option value="Markušica">Markušica</option>
                        <option value="Medulin">Medulin</option>
                        <option value="Mihovljan">Mihovljan</option>
                        <option value="Mikleuš">Mikleuš</option>
                        <option value="Milna">Milna</option>
                        <option value="Molve">Molve</option>
                        <option value="Mošćenička Draga">
                          Mošćenička Draga
                        </option>
                        <option value="Motovun">Motovun</option>
                        <option value="Murter">Murter</option>
                        <option value="Medulin">Medulin</option>
                        <option value="Metković">Metković</option>
                        <option value="Mihovljan">Mihovljan</option>
                        <option value="Mursko Središće">Mursko Središće</option>
                        <option value="Našice">Našice</option>
                        <option value="Nedelišće">Nedelišće</option>
                        <option value="Netretić">Netretić</option>
                        <option value="Nova Gradiška">Nova Gradiška</option>
                        <option value="Nova Rača">Nova Rača</option>
                        <option value="Novalja">Novalja</option>
                        <option value="Novi Marof">Novi Marof</option>
                        <option value="Novska">Novska</option>
                        <option value="Nuštar">Nuštar</option>
                        <option value="Negoslavci">Negoslavci</option>
                        <option value="Nova Kapela">Nova Kapela</option>
                        <option value="Novigrad">Novigrad</option>
                        <option value="Novigrad Podravski">
                          Novigrad Podravski
                        </option>
                        <option value="Novi Golubovec">Novi Golubovec</option>
                        <option value="Novo Virje">Novo Virje</option>
                        <option value="Omiš">Omiš</option>
                        <option value="Omišalj">Omišalj</option>
                        <option value="Opuzen">Opuzen</option>
                        <option value="Orahovica">Orahovica</option>
                        <option value="Opatija">Opatija</option>
                        <option value="Orebić">Orebić</option>
                        <option value="Oroslavje">Oroslavje</option>
                        <option value="Orehovica">Orehovica</option>
                        <option value="Orle">Orle</option>
                        <option value="Okrug Gornji">Okrug Gornji</option>
                        <option value="Otok">Otok</option>
                        <option value="Otok">Otok</option>
                        <option value="Osijek">Osijek</option>
                        <option value="Pag">Pag</option>
                        <option value="Pazin">Pazin</option>
                        <option value="Pakrac">Pakrac</option>
                        <option value="Pakoštane">Pakoštane</option>
                        <option value="Pašman">Pašman</option>
                        <option value="Peteranec">Peteranec</option>
                        <option value="Petrovsko">Petrovsko</option>
                        <option value="Petrovsko">Petrovsko</option>
                        <option value="Pićan">Pićan</option>
                        <option value="Pisarovina">Pisarovina</option>
                        <option value="Pitomača">Pitomača</option>
                        <option value="Podbablje">Podbablje</option>
                        <option value="Podgora">Podgora</option>
                        <option value="Podravske Sesvete">
                          Podravske Sesvete
                        </option>
                        <option value="Podstrana">Podstrana</option>
                        <option value="Poličnik">Poličnik</option>
                        <option value="Poljanica Bistranska">
                          Poljanica Bistranska
                        </option>
                        <option value="Popovac">Popovac</option>
                        <option value="Posedarje">Posedarje</option>
                        <option value="Postire">Postire</option>
                        <option value="Povljana">Povljana</option>
                        <option value="Pprivlaka">Pprivlaka</option>
                        <option value="Primorski Dolac">Primorski Dolac</option>
                        <option value="Pribislavec">Pribislavec</option>
                        <option value="Privlaka">Privlaka</option>
                        <option value="Prizna">Prizna</option>
                        <option value="Punitovci">Punitovci</option>
                        <option value="Punat">Punat</option>
                        <option value="Pustara Višica">Pustara Višica</option>
                        <option value="Petrinja">Petrinja</option>
                        <option value="Ploče">Ploče</option>
                        <option value="Podturen">Podturen</option>
                        <option value="Popovača">Popovača</option>
                        <option value="Poreč">Poreč</option>
                        <option value="Požega">Požega</option>
                        <option value="Primošten">Primošten</option>
                        <option value="Privlaka">Privlaka</option>
                        <option value="Pula">Pula</option>
                        <option value="Rab">Rab</option>
                        <option value="Raša">Raša</option>
                        <option value="Rakovec">Rakovec</option>
                        <option value="Rasinja">Rasinja</option>
                        <option value="Rešetari">Rešetari</option>
                        <option value="Ribnica">Ribnica</option>
                        <option value="Rogoznica">Rogoznica</option>
                        <option value="Rugvica">Rugvica</option>
                        <option value="Runović">Runović</option>
                        <option value="Ravna Gora">Ravna Gora</option>
                        <option value="Rijeka">Rijeka</option>
                        <option value="Rovišće">Rovišće</option>
                        <option value="Rovinj">Rovinj</option>
                        <option value="Sinj">Sinj</option>
                        <option value="Sisak">Sisak</option>
                        <option value="Selca">Selca</option>
                        <option value="Selnica">Selnica</option>
                        <option value="Severin">Severin</option>
                        <option value="Sibinj">Sibinj</option>
                        <option value="Sikirevci">Sikirevci</option>
                        <option value="Slatina">Slatina</option>
                        <option value="Slavonski Šamac">Slavonski Šamac</option>
                        <option value="Smokvica">Smokvica</option>
                        <option value="Sokolovac">Sokolovac</option>
                        <option value="Starigrad">Starigrad</option>
                        <option value="Staro Petrovo Selo">
                          Staro Petrovo Selo
                        </option>
                        <option value="Stankovci">Stankovci</option>
                        <option value="Stari Mikanovci">Stari Mikanovci</option>
                        <option value="Strahoninec">Strahoninec</option>
                        <option value="Strizivojna">Strizivojna</option>
                        <option value="Suhopolje">Suhopolje</option>
                        <option value="Sutivan">Sutivan</option>
                        <option value="Sveti Filip i Jakov">
                          Sveti Filip i Jakov
                        </option>
                        <option value="Sveti Ivan Žabno">
                          Sveti Ivan Žabno
                        </option>
                        <option value="Sveti Ilija">Sveti Ilija</option>
                        <option value="Sveti Križ Začretje">
                          Sveti Križ Začretje
                        </option>
                        <option value="Sveti Martin na Muri">
                          Sveti Martin na Muri
                        </option>
                        <option value="Sveti Petar Orehovec">
                          Sveti Petar Orehovec
                        </option>
                        <option value="Sveti Petar u Šumi">
                          Sveti Petar u Šumi
                        </option>
                        <option value="Svetvinčenat">Svetvinčenat</option>
                        <option value="Skradin">Skradin</option>
                        <option value="Slavonski Brod">Slavonski Brod</option>
                        <option value="Slatina">Slatina</option>
                        <option value="Solin">Solin</option>
                        <option value="Sračinec">Sračinec</option>
                        <option value="Sukošan">Sukošan</option>
                        <option value="Supetar">Supetar</option>
                        <option value="Sveti Ðurđ">Sveti Ðurđ</option>
                        <option value="Sveti Ivan Zelina">
                          Sveti Ivan Zelina
                        </option>
                        <option value="Šandrovac">Šandrovac</option>
                        <option value="Šakanje">Šakanje</option>
                        <option value="Škabrnje">Škabrnje</option>
                        <option value="Štefanje">Štefanje</option>
                        <option value="Šveti Petar u Šumi">
                          Šveti Petar u Šumi
                        </option>
                        <option value="Šenkovec">Šenkovec</option>
                        <option value="Štitar">Štitar</option>
                        <option value="Šibenik">Šibenik</option>
                        <option value="Štefanje">Štefanje</option>
                        <option value="Tisno">Tisno</option>
                        <option value="Tinjan">Tinjan</option>
                        <option value="Trpanj">Trpanj</option>
                        <option value="Tučepi">Tučepi</option>
                        <option value="Tuhelj">Tuhelj</option>
                        <option value="Tordinci">Tordinci</option>
                        <option value="Trnovec Bartolovečki">
                          Trnovec Bartolovečki
                        </option>
                        <option value="Tribunj">Tribunj</option>
                        <option value="Tučepi">Tučepi</option>
                        <option value="Tovarnik">Tovarnik</option>
                        <option value="Trilj">Trilj</option>
                        <option value="Trnovec Bartolovečki">
                          Trnovec Bartolovečki
                        </option>
                        <option value="Trogir">Trogir</option>
                        <option value="Umag">Umag</option>
                        <option value="Veliko Trojstvo">Veliko Trojstvo</option>
                        <option value="Veliko Trgovišće">
                          Veliko Trgovišće
                        </option>
                        <option value="Vela Luka">Vela Luka</option>
                        <option value="Velika">Velika</option>
                        <option value="Velika Kopanica">Velika Kopanica</option>
                        <option value="Velika Ludina">Velika Ludina</option>
                        <option value="Vidovec">Vidovec</option>
                        <option value="Višnjan">Višnjan</option>
                        <option value="Viškovci">Viškovci</option>
                        <option value="Vis">Vis</option>
                        <option value="Visoko">Visoko</option>
                        <option value="Vladislavci">Vladislavci</option>
                        <option value="Vlaka">Vlaka</option>
                        <option value="Vratišinec">Vratišinec</option>
                        <option value="Vrsar">Vrsar</option>
                        <option value="Vrsi">Vrsi</option>
                        <option value="Vrpolje">Vrpolje</option>
                        <option value="Vidovec">Vidovec</option>
                        <option value="Vinkovci">Vinkovci</option>
                        <option value="Vinica">Vinica</option>
                        <option value="Viškovo">Viškovo</option>
                        <option value="Vodice">Vodice</option>
                        <option value="Vodnjan">Vodnjan</option>
                        <option value="Vrgorac">Vrgorac</option>
                        <option value="Vinica">Vinica</option>
                        <option value="Vir">Vir</option>
                        <option value="Vrbovec">Vrbovec</option>
                        <option value="Vrpolje">Vrpolje</option>
                        <option value="Vrsar">Vrsar</option>
                        <option value="Zabok">Zabok</option>
                        <option value="Zadvarje">Zadvarje</option>
                        <option value="Zagorska Sela">Zagorska Sela</option>
                        <option value="Zemunik Donji">Zemunik Donji</option>
                        <option value="Zrinski Topolovac">
                          Zrinski Topolovac
                        </option>
                        <option value="Zlatar">Zlatar</option>
                        <option value="Zmijavci">Zmijavci</option>
                        <option value="Zminj">Zminj</option>
                        <option value="Zadvarje">Zadvarje</option>
                        <option value="Zemunik Donji">Zemunik Donji</option>
                        <option value="Zlatar">Zlatar</option>
                        <option value="Zlatar Bistrica">Zlatar Bistrica</option>
                        <option value="Zmijavci">Zmijavci</option>
                        <option value="Zminj">Zminj</option>
                        <option value="Zrinski Topolovac">
                          Zrinski Topolovac
                        </option>
                        <option value="Zadar">Zadar</option>
                        <option value="Zagreb">Zagreb</option>
                        <option value="Zaprešić">Zaprešić</option>
                        <option value="Zaprešić">Zaprešić</option>
                        <option value="Zlatar Bistrica">Zlatar Bistrica</option>
                        <option value="Žakanje">Žakanje</option>
                        <option value="Žminj">Žminj</option>
                      </select>
                    </div>
                  ) : (
                    <div className="field-form">
                      <label htmlFor="residenceField">
                        Wohnort / Mjesto prebivališta{" "}
                      </label>
                      <input
                        type="text"
                        name="residenceField"
                        id="residenceField"
                        value={residenceFields[index]}
                        onChange={(e) => {
                          handleResidenceFieldChange(e, index);
                        }}
                      />
                    </div>
                  )}

                  <div class="field-form">
                    <label for="document-type">
                      Dokumentart / Vrsta isprave{" "}
                    </label>
                    <select name="document-type" id="document-type">
                      <option value="id">Personalausweis</option>
                      <option value="passport">Passport</option>
                    </select>
                  </div>
                  {/* Add the rest of your form fields here */}
                  <div className="field-form">
                    <label
                      htmlFor="document-number"
                      style={{
                        color: isDocumentNumberValid ? "#938b8b" : "red",
                      }}
                    >
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

export default GermanForm;
