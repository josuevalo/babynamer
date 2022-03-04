import { useState } from "react";
// import Cookies from 'universal-cookie';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import axios from "axios";
import Navbar from "./components/Navbar";
import Home from './Home'

// const cookies = new Cookies();

export default function App() {
  const { state, setState } = useState("");

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        Babynamer
          <Link to="/">Home</Link> | <Link to="/expenses">Expenses</Link>
        <Routes>
        <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
