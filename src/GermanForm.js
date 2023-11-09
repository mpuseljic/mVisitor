import React from "react";
import { useState, useEffect } from "react";

function GermanForm() {
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
                    <label for="lastName">Familienname / Prezime</label>
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
                      value={formData.dateOfBirth}
                      onChange={handleDateOfBirthChange}
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
                      onChange={(e) => {
                        handleCitizenshipChange(e);
                        handleInputChange(e);
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
                      Land des Geburtsorts / Država rođenja
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
                      Aufenthaltsland / Država prebivališta
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
                        Wohnort / Mjesto prebivališta
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
                        Wohnort / Mjesto prebivališta
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
                      Dokumentart / Vrsta isprave
                    </label>
                    <select name="document-type" id="document-type">
                      <option value="id">Personalausweis</option>
                      <option value="passport">Passport</option>
                    </select>
                  </div>
                  {/* Add the rest of your form fields here */}
                  <div className="field-form">
                    <label htmlFor="document-number">
                      Dokumentennummer / Broj isprave
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
                Ich akzeptiere die DSGVO und die Datenschutzrichtlinien
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

export default GermanForm;
