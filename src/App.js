import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Form from "./Form";
import Head from "./Head";
import ItalianForm from "./ItalianForm";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <main>
          <Head />
          <Routes>
            <Route path="/" element={<Form />} />
            <Route path="/italian" element={<ItalianForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
