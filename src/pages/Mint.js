import { ethers, toBigInt } from 'ethers';
import { useEffect, useState } from 'react';
import Hero from '../artifacts/contracts/Hero.sol/Hero.json';



//contract address
const heroAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function Mint () {

//state hooks for address connecting

const [accounts, setAccounts] = useState([]);
async function connectAccounts() {
  if(window.ethereum){
    const accounts = await window.ethereum.request( { method: 'eth_requestAccounts'});
    setAccounts(accounts);
  }
}

useEffect(() => {
  connectAccounts();
}, [] );

//Minting
const [power, setPower] = useState();
const [quickness, setQuickness] = useState();
const [intuition, setIntuition] = useState();
const [int, setInt] = useState();
const [health, setHealth] = useState();
const [presence, setPresence] = useState();
const [name, setName] = useState();

const isConnected = Boolean(accounts[0]);

async function handleMint() {
  if(window.ethereum) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(heroAddress, Hero.abi, signer);
    try{
      const data = await contract.safeMint(toBigInt.from(power), toBigInt.from(quickness), toBigInt.from(intuition), toBigInt.from(int), toBigInt.from(health), toBigInt.from(presence), name,);
      console.log('data: ', data);
    } catch (error) {
      console.log('Error: ', error);
    }
  }
}

    return (
    <div>
        <h1> Mint </h1>
        <br/>
        
        {isConnected ? (
            <div>
            <p>Connected</p>
            <br/>
            <input
                placeholder="Power"
                type="number"
                value={power}
                onChange={(e) => setPower(e.target.value)}
            />
            <input
                placeholder="Quickness"
                type="number"
                value={quickness}
                onChange={(e) => setQuickness(e.target.value)}
            />
            <input
                placeholder="Intuition"
                type="number"
                value={intuition}
                onChange={(e) => setIntuition(e.target.value)}
            />
            <input
                placeholder="Int"
                type="number"
                value={int}
                onChange={(e) => setInt(e.target.value)}
            />
            <input
                placeholder="Health"
                type="number"
                value={health}
                onChange={(e) => setHealth(e.target.value)}
            />
            <input
                placeholder="Presence"
                type="number"
                value={presence}
                onChange={(e) => setPresence(e.target.value)}
            />
            <input
                placeholder="Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            {accounts.length && ( 
            <div> 
                <button onClick={handleMint}> Mint </button>
            </div>
            
            )}
            </div>
            ) : (
                <div>
                <button onClick={connectAccounts}>Connect</button>
                </div>
        )}
        
        </div>
    );
}

export default Mint;