import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Mint from './pages/Mint';
import Navbar from './pages/Navbar';
import { useState } from 'react';
import { ethers } from 'ethers';
import Hero from './artifacts/contracts/Hero.sol/Hero.json';

//contract address
const heroAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

// Requests Meta Mask accounts
async function requestAccount() {
  await window.ethereum.request( { method: 'eth_requestAccounts'});
}

//If wallet connected
if (typeof window.ethereum !== "undefined"){
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(heroAddress, Hero.abi, provider);
  try{
    const data = await contract.hero();
    console.log('data: ', data);
  } catch (error) {
    console.log('Error: ', error);
  }
}

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='mint' element={<Mint />}/>
          <Route path='*' element={<h1> Page Not Found</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
