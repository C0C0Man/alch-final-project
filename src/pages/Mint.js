import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import Hero from '../artifacts/contracts/Hero.sol/Hero.json';

//contract address
const heroAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

//ABI for ethers v6?
const ABI = [
  "function safeMint(address _to, string _name, uint256 _power, uint256 _quickness, uint256 _intuition, uint256 _int, uint256 _health, uint256 _presence) public payable"
];

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

/*  Example for ethers v6
const handleDepositSubmit = async (e) => {
  try{
    e.preventDefault()
    if(window.ethereum){
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, ABI, signer);

        const ethValue = ethers.parseEther(depositValue)
        const depositEth = await contract.deposit({value: ethValue})
        await depositEth.wait()
        const balance = await provider.getBalance(contractAddress)
        const balanceFormatted = ethers.formatEther(balance)
        setBalance(balanceFormatted)
    } else {
        console.log("Ethereum object not found, install Metamask.");
    }
} catch (error) {
    console.log(error)
} */

const handleMint = async (e) => {
  try{
    e.preventDefault();
    if(window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(heroAddress, ABI, signer);

      const data = await contract.safeMint(signer, name, power, quickness, intuition, int, health, presence);
      console.log('Mint Data: ', data);
    }
  } catch(error) {
    console.log('Error: ', error);
  }


  /* old attempt
  if(window.ethereum) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(heroAddress, ABI, signer);
    try{
      const data = await contract.safeMint(signer, name, power, quickness, intuition, int, health, presence);
      console.log('data: ', data);
    } catch (error) {
      console.log('Error: ', error);
    }
  } */
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