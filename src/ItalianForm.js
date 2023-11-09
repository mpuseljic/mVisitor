import React from "react";
import { useState, useEffect } from "react";

function ItalianForm() {
  const [formData, setFormData] = useState({
    citizenship: "",
    countryOfBirth: "",
    countyOfResidence: "",
    cityOfResidence: "",
    dateOfBirth: "",
    documentNumber: "",
    firstName: "",
    lastName: "",
  });

  const [residenceField, setResidenceField] = useState("");
  const [persons, setPersons] = useState([{ id: 1 }]);

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

  const handleCitizenshipChange = (e) => {
    const selectedCitizenship = e.target.value;
    setFormData({
      ...formData,
      citizenship: selectedCitizenship,
      countryOfBirth: selectedCitizenship,
      countyOfResidence: selectedCitizenship,
    });
  };

  const handleCountryOfResidenceChange = (e) => {
    const selectedCountryOfResidence = e.target.value;
    setFormData({
      ...formData,
      countyOfResidence: selectedCountryOfResidence,
      cityOfResidence:
        selectedCountryOfResidence === "Croatia"
          ? formData.cityOfResidence
          : "",
    });
  };

  const handleCityOfResidenceChange = (e) => {
    const selectedCityOfResidence = e.target.value;
    setFormData({
      ...formData,
      cityOfResidence: selectedCityOfResidence,
    });
  };

  const handleCountryOfBirthChange = (e) => {
    const selectedCountryOfBirth = e.target.value;
    setFormData({
      ...formData,
      countryOfBirth: selectedCountryOfBirth,
    });
  };

  const handleDateOfBirthChange = (e) => {
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

    setFormData({
      ...formData,
      dateOfBirth: value,
    });
  };

  const MAX_CHAR_LENGTH = 100;
  const MAX_DOCUMENT_NUMBER_LENGTH = 16;
  const MAX_PERSONS = 10;

  const handleInputChange = (e) => {
    const value = e.target.value.slice(0, MAX_CHAR_LENGTH);
    setFormData({
      ...formData,
      firstName: value,
      lastName: value,
      citizenship: value,
      countryOfBirth: value,
      countyOfResidence: value,
      cityOfResidence: value,
    });
  };

  const handleDocumentNumberChange = (e) => {
    const value = e.target.value.slice(0, MAX_DOCUMENT_NUMBER_LENGTH);
    setFormData({
      ...formData,
      documentNumber: value,
    });
  };

  const handleAddPerson = (e) => {
    e.preventDefault();
    if (persons.length < MAX_PERSONS) {
      const newPerson = { id: persons.length + 1 };
      setPersons([...persons, newPerson]);
    }
  };

  const handleRemovePerson = (e) => {
    e.preventDefault();
    if (persons.length > 1) {
      setPersons((prevPersons) => prevPersons.slice(0, -1));
    }
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
                    <label htmlFor="firstName">Nome / Ime</label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      placeholder=""
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div class="field-form">
                    <label for="lastName">Cognome / Prezime</label>
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      placeholder
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div class="field-form">
                    <label>Genere / Spol </label>
                    <select name="spol" id="spol">
                      <option value="male">Maschio</option>
                      <option value="female">Femmina</option>
                    </select>
                  </div>
                  <div class="field-form">
                    <label for="date">Data di nascita / Datum rođenja </label>
                    <input
                      type="text"
                      name="datum"
                      id="datum"
                      placeholder="dd.MM.yyyy"
                      value={formData.dateOfBirth}
                      onChange={handleDateOfBirthChange}
                    />
                  </div>
                  <div class="field-form">
                    <label for="citizenship">
                      Cittadinanza / Državljanstvo{" "}
                    </label>
                    <input
                      type="text"
                      name="drzavljanstvo"
                      id="drzavljanstvo"
                      list="countries"
                      onChange={(e) => {
                        handleCitizenshipChange(e);
                        handleInputChange(e);
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
                      Paese di nascita / Država rođenja
                    </label>
                    <input
                      type="text"
                      name="country-of-birth"
                      id="country-of-birth"
                      list="countries"
                      value={formData.countryOfBirth}
                      onChange={handleCountryOfBirthChange}
                    />
                  </div>
                  <div class="field-form">
                    <label for="country-of-residence">
                      Paese di residenza / Država prebivališta
                    </label>
                    <input
                      type="text"
                      name="country-of-residence"
                      id="country-of-residence"
                      list="countries"
                      value={formData.countyOfResidence}
                      onChange={handleCountryOfResidenceChange}
                    />
                  </div>
                  {formData.countyOfResidence === "Croatia" ? (
                    <div className="field-form">
                      <label htmlFor="city-select">
                        Luogo di residenza / Mjesto prebivališta
                      </label>
                      <select
                        id="city-select"
                        name="city-select"
                        value={formData.cityOfResidence}
                        onChange={(e) => {
                          handleCityOfResidenceChange(e);
                          handleInputChange(e);
                        }}
                      >
                        <option value="" disabled>
                          Select city
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
                        Luogo di residenza / Mjesto prebivališta
                      </label>
                      <input
                        type="text"
                        name="residenceField"
                        id="residenceField"
                        value={residenceField}
                        onChange={(e) => setResidenceField(e.target.value)}
                      />
                    </div>
                  )}

                  <div class="field-form">
                    <label for="document-type">
                      Tipo di documento / Vrsta isprave
                    </label>
                    <select name="document-type" id="document-type">
                      <option value="id">Carta d'identità</option>
                      <option value="passport">Passporto</option>
                    </select>
                  </div>
                  {/* Add the rest of your form fields here */}
                  <div className="field-form">
                    <label htmlFor="document-number">
                      Numero del documento / Broj isprave
                    </label>
                    <input
                      type="text"
                      name="document-number"
                      id="document-number"
                      value={formData.documentNumber}
                      onChange={handleDocumentNumberChange}
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
                        ? "AGGIUNGI PERSONA SUCCESSIVA"
                        : "RIMUOVI PERSONA"}
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
                Accetto il GDPR e la politica sulla privacy
              </span>
            </label>
          </div>

          <p className="check-in">
            <button
              id="submit"
              className="submit"
              // Replace with your actual function
            >
              CHECK-IN
            </button>
          </p>
        </div>
      </div>
    </main>
  );
}

export default ItalianForm;
