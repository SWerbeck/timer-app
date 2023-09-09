import React from "react";
import "./App.css";
import Timer from "./components/Timer";

function App() {
  return (
    <div className="custom-component">
      <div className="card text-center header-section">Header section</div>
      <Timer />
      <div className="card footer text-body-secondary footer-section">
        Footer
      </div>
    </div>
  );
}

export default App;
