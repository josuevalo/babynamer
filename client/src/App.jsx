import { useState } from "react";
// import Cookies from 'universal-cookie';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import axios from "axios";
import Navbar from "./components/Navbar";
import Home from './Home'
import BabyName from "./BabyName";

// const cookies = new Cookies();

export default function App() {
  const { state, setState } = useState("");

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:username" element={<BabyName />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
