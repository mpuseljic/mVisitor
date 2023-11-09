import React from "react";
import { useState, useEffect } from "react";

function Form() {
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
    let value = e.target.value;
    if (value.length === 2 || value.length === 5) {
      value += ".";
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
                    <label htmlFor="firstName">Name / Ime</label>
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
                    <label for="lastName">Lastname / Prezime</label>
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
                      value={formData.dateOfBirth}
                      onChange={handleDateOfBirthChange}
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
                      Country of birth / Država rođenja
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
                      Country of residence / Država prebivališta
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
                        Place of residence / Mjesto prebivališta
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
                        <option value="Babina Greda">Babina Greda</option>
                        <option value="Baška Voda">Baška Voda</option>
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
                        <option value="Crikvenica">Crikvenica</option>
                        <option value="Čakovec">Čakovec</option>
                        <option value="Čazma">Čazma</option>
                        <option value="Čavle">Čavle</option>
                        <option value="Čepin">Čepin</option>
                        <option value="Delnice">Delnice</option>
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
                        <option value="Erdut">Erdut</option>
                        <option value="Garešnica">Garešnica</option>
                        <option value="Gospić">Gospić</option>
                        <option value="Gradac">Gradac</option>
                        <option value="Gornji Kneginec">Gornji Kneginec</option>
                        <option value="Goričan">Goričan</option>
                        <option value="Gradište">Gradište</option>
                        <option value="Gunja">Gunja</option>
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
                        <option value="Jalžabet">Jalžabet</option>
                        <option value="Jastrebarsko">Jastrebarsko</option>
                        <option value="Jelenje">Jelenje</option>
                        <option value="Josipdol">Josipdol</option>
                        <option value="Jurdani">Jurdani</option>
                        <option value="Karanac">Karanac</option>
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
                        <option value="Lovran">Lovran</option>
                        <option value="Ludbreg">Ludbreg</option>
                        <option value="Makarska">Makarska</option>
                        <option value="Mala Subotica">Mala Subotica</option>
                        <option value="Marčana">Marčana</option>
                        <option value="Martijanec">Martijanec</option>
                        <option value="Martinska Ves">Martinska Ves</option>
                        <option value="Matulji">Matulji</option>
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
                        <option value="Omiš">Omiš</option>
                        <option value="Omišalj">Omišalj</option>
                        <option value="Opuzen">Opuzen</option>
                        <option value="Orahovica">Orahovica</option>
                        <option value="Opatija">Opatija</option>
                        <option value="Orebić">Orebić</option>
                        <option value="Oroslavje">Oroslavje</option>
                        <option value="Osijek">Osijek</option>
                        <option value="Pag">Pag</option>
                        <option value="Pazin">Pazin</option>
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
                        <option value="Ravna Gora">Ravna Gora</option>
                        <option value="Rijeka">Rijeka</option>
                        <option value="Rovišće">Rovišće</option>
                        <option value="Rovinj">Rovinj</option>
                        <option value="Sinj">Sinj</option>
                        <option value="Sisak">Sisak</option>
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
                        <option value="Tisno">Tisno</option>
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
                        <option value="Vidovec">Vidovec</option>
                        <option value="Vinkovci">Vinkovci</option>
                        <option value="Vinica">Vinica</option>
                        <option value="Viškovo">Viškovo</option>
                        <option value="Vodice">Vodice</option>
                        <option value="Vodnjan">Vodnjan</option>
                        <option value="Vrgorac">Vrgorac</option>
                        <option value="Vrbovec">Vrbovec</option>
                        <option value="Vrpolje">Vrpolje</option>
                        <option value="Vrsar">Vrsar</option>
                        <option value="Zabok">Zabok</option>
                        <option value="Zadar">Zadar</option>
                        <option value="Zagreb">Zagreb</option>
                        <option value="Zaprešić">Zaprešić</option>
                        <option value="Zaprešić">Zaprešić</option>
                        <option value="Šenkovec">Šenkovec</option>
                        <option value="Šibenik">Šibenik</option>
                        {/* Add more hardcoded options */}
                      </select>
                    </div>
                  ) : (
                    <div className="field-form">
                      <label htmlFor="residenceField">
                        Place of residence / Mjesto prebivališta
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
                      Document type / Vrsta isprave
                    </label>
                    <select name="document-type" id="document-type">
                      <option value="id">ID</option>
                      <option value="passport">Passport</option>
                    </select>
                  </div>
                  {/* Add the rest of your form fields here */}
                  <div className="field-form">
                    <label htmlFor="document-number">
                      Document number / Broj isprave
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
              <span className="text">I accept the GDPR and privacy policy</span>
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

export default Form;
