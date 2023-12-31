
import { useState } from 'react';
import NFTCard from '../components/nftcard';
import {fetchNFTs} from '../utils/fetchNFTs';
import heroABI from '../heroABI';
import { AlchemyProvider, ethers } from 'ethers';
import "./MyPeeps.css";

const MyPeeps = () => {
    const [owner, setOwner] = useState("")
    const [contractAddress, setContractAddress] = useState("0xd920744eC057bd3C7E0F38BE39EBd3a65221211b")
    const [NFTs, setNFTs] = useState("")
    const [accounts, setAccounts] = useState([]);
    let provider = new AlchemyProvider('sepolia', `F46xckKupo-KfR19BuySB4Mr9djAy3ba`)
    let contract = new ethers.Contract(contractAddress, heroABI, provider) 

    //const contractAddress = "0xd920744eC057bd3C7E0F38BE39EBd3a65221211b";
async function connectAccounts() {
  if(window.ethereum){
    const accounts = await window.ethereum.request( { method: 'eth_requestAccounts'});
    setAccounts(accounts);
  }
}

connectAccounts();

return (
    <div className="container"> {/* Overall container for layout */}
      <header className="header"> {/* Header section */}
        <div className="header-content"> {/* Content wrapper for header */}
          <h1 className="header-title">Hero NFT Explorer</h1>
          <p className="header-description">Check out a wallet's Heros!</p>
        </div>
        <div className="header-search"> {/* Search input and button */}
          <input
            className="search-input"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            placeholder="Insert your wallet address"
          />
          <button className="search-button" onClick={() => fetchNFTs(owner, contractAddress, setNFTs, contract, provider)}>
            Search
          </button>
        </div>
      </header>
  
      <section className="nft-grid"> {/* Section for NFT cards grid */}
        {NFTs ? (
          NFTs.map((NFT) => (
            <div key={NFT.id.tokenId}>
              <NFTCard
                id={NFT.id.tokenId}
                address={NFT.contract.address}
                name={NFT.contractMetadata.name}
                heroName={NFT.heroName}
                power={NFT.power}
                deduction={NFT.deduction}
                health={NFT.health}
                presence={NFT.presence}
              />
            </div>
          ))
        ) : (
          <div className="no-nfts">No NFTs found</div>
        )}
      </section>
    </div>
  );
}  


export default MyPeeps;
