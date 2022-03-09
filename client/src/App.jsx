import { useState } from "react";
// import Cookies from 'universal-cookie';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./Home";
import BabyName from "./BabyName";

// const cookies = new Cookies();

export default function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/:username"
            element={
              <BabyName />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
