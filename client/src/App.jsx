import { useState } from 'react'
// import Cookies from 'universal-cookie';
import "./App.css";
import axios from 'axios'
import Navbar from './components/Navbar';

// const cookies = new Cookies();

export default function App() {
const { state, setState } = useState('')


  return ( 
 <div className='App'>
   <Navbar />
   Babynamer
 </div>

  )};