import { ethers, BigNumber } from 'ethers';
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
const [power, quickness, intuition, int, health, presence, name, setStats] = useState(10, 10, 10, 10, 10, 10, "Name");

const isConnected = Boolean(accounts[0]);

async function handleMint() {
  if(window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(heroAddress, Hero.abi, signer);
    try{
      const data = await contract.safeMint(BigNumber.from(power), BigNumber.from(quickness), BigNumber.from(intuition), BigNumber.from(int), BigNumber.from(health), BigNumber.from(presence), name,);
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
            <input placeholder="Power" type='number' value={power} />
            <input placeholder="Quickness" type='number' value={quickness}/>
            <input placeholder="Intuition" type='number' value={intuition}/>
            <input placeholder="Intelegence" type='number' value={int}/>
            <input placeholder="Health" type='number' value={health}/>
            <input placeholder="Presence" type='number' value={presence}/>
            <input placeholder="Name" type='string' value={name} />
            {accounts.length && ( 
            <div> 
                <button onClick={() => setStats(power, quickness, intuition, int, health, presence, name)} > Set Stats </button>
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