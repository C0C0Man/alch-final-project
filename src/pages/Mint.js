import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import heroABI from '../HeroABI.json';
import './Mint.css'; 

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
  <div className="container">
    <h1 className="title">Mint Your Hero</h1>
    <br />

    {isConnected ? (
      <div className="connected-content">
        <p className="connected">Connected</p>
        <br />
        <input
          className="input-field"
          placeholder="Power"
          type="number"
          value={power}
          onChange={(e) => setPower(e.target.value)}
        />
        <input
          className="input-field"
          placeholder="Deduction"
          type="number"
          value={deduction}
          onChange={(e) => setDeduction(e.target.value)}
        />
        <input
          className="input-field"
          placeholder="Health"
          type="number"
          value={health}
          onChange={(e) => setHealth(e.target.value)}
        />
        <input
          className="input-field"
          placeholder="Presence"
          type="number"
          value={presence}
          onChange={(e) => setPresence(e.target.value)}
        />
        <input
          className="input-field"
          placeholder="Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {accounts.length && (
          <div className="mint-button-container">
            <button className="mint-button" onClick={handleMint}>
              Mint
            </button>
          </div>
        )}
      </div>
    ) : (
      <div className="connect-button-container">
        <button className="connect-button" onClick={connectAccounts}>
          Connect
        </button>
      </div>
    )}
    <br />
    <div className="grid">
    {mintEvents.map((mintEvent) => (
  <div className="mint-card" key={mintEvent.tokenId}>
    <h3 className="mint-card-title">{mintEvent.name}</h3> {/* Added heading for token name */}
    <div className="mint-card-info">
      <p className="mint-card-owner">Owner: {mintEvent.to}</p> {/* Specific class for owner */}
      <p className="mint-card-token-id">Token ID: {`${mintEvent.tokenId}`}</p> {/* Specific class for token ID */}
      <p className="mint-card-stats">
        <span>Power: {`${mintEvent.power}`}</span> {/* Wrapped stats in a span for grouping */}
        <span>Deduction: {`${mintEvent.deduction}`}</span>
        <span>Health: {`${mintEvent.health}`}</span>
        <span>Presence: {`${mintEvent.presence}`}</span>
      </p>
    </div>
  </div>
))}

    </div>
  </div>
);
}

export default Mint;