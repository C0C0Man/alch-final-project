import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import heroABI from '../HeroABI.json';

function Mint () {

  //contract address
const heroAddress = "0x430585AF28cD9631f5B51313791012Ca6f3469E2";


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



const handleMint = async (e) => {
  try{
    e.preventDefault();
    if(window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(heroAddress, heroABI, signer);

      const data = await contract.safeMint(signer, name, power, quickness, intuition, int, health, presence);

      // Event listener to grab data from
      
      contract.on("TokenMinted", (owner, tokenId, tokenName, stStat, quStat, intelStat, intuStat, healStat, presStat, event) => {
        let mintEvent ={
          to: owner,
          tokenId: tokenId,
          name: tokenName,
          power: stStat,
          quickness: quStat,
          intuition: intuStat,
          int: intelStat,
          health: healStat,
          presence: presStat,
          event
        }
        console.log(mintEvent);
      });
      
      
      console.log('Mint Data: ', data);

       // Wait for the transaction receipt
       const receipt = await provider.waitForTransaction(data.hash);

       console.log(receipt);
       
       

    }
  }catch(error) {
    console.log('Error: ', error);
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