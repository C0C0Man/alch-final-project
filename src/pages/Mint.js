import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import heroABI from '../HeroABI.json';

function Mint () {

  //contract address
const heroAddress = "0xd920744eC057bd3C7E0F38BE39EBd3a65221211b";


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
const [deduction, setDeduction] = useState();
const [health, setHealth] = useState(); 
const [presence, setPresence] = useState();
const [name, setName] = useState();

const [mintEvents, setMintEvents] = useState([]);

const isConnected = Boolean(accounts[0]);



const handleMint = async (e) => {
  try{
    e.preventDefault();
    if(window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(heroAddress, heroABI, signer);

      const data = await contract.safeMint(signer, name, power, deduction, health, presence);
      
      // Event listener to grab data from
      
      contract.on("TokenMinted", (owner, tokenId, tokenName, pwStat, dedStat, healStat, presStat, event) => {
        let newMintEvent ={
          to: owner,
          tokenId: tokenId,
          name: tokenName,
          power: pwStat,
          deduction: dedStat,
          health: healStat,
          presence: presStat,
          event
        };
        const updatedMintEvents = [...mintEvents, newMintEvent];
        setMintEvents(updatedMintEvents);

        console.log(newMintEvent);
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
                placeholder="Deduction"
                type="number"
                value={deduction}
                onChange={(e) => setDeduction(e.target.value)}
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
        <br></br>
        <div className="grid">
         {mintEvents.map((mintEvent) => (
         <div className="mint-card" key={mintEvent.tokenId}>
            <p>Owner: {mintEvent.to}</p>
            <p>Token ID: {`${mintEvent.tokenId}`}</p>
            <p>Token Name: {mintEvent.name}</p>
            <p>Power: {`${mintEvent.power}`}</p>
            <p>Deduction: {`${mintEvent.deduction}`}</p>
            <p>Health: {`${mintEvent.health}`}</p>
            <p>Presence: {`${mintEvent.presence}`}</p>
          </div>
        ))}
      </div>
    </div>
        
    );
}

export default Mint;