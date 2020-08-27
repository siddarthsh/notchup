import React from "react";
import logo from "./logo.png";
import "./App.css";
import Form from "./form";

function App() {
  return (
    <div className="App">
      <header className="navbar">
        <img src={logo} className="logo" alt="logo" />
      </header>
      <div className="section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12">
              <h1 className="text-center mb-3">Booking Form</h1>

              <p className="text-center mb-5">
                Fill in the details below in-order to book a trial class.
              </p>
              <Form />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
