
import { useState } from 'react';
import NFTCard from '../components/nftcard';
import {fetchNFTs} from '../utils/fetchNFTs';
import heroABI from '../heroABI';
import { AlchemyProvider, ethers } from 'ethers';





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
        <div>
            <header className=' py-24  mb-12 w-full   alchemy'>
                <div className='flex-grow flex justify-end mr-12 mb-12'>
                </div>
                <div className='flex flex-col items-center mb-12'>
                    <div className='mb-16 text-white text-center'>
                        <h1 className='text-5xl  font-bold font-body mb-2'>
                            Alchemy NFT Explorer
                        </h1>
                        <p>An inspector to find NFTs by owner and contract address </p>
                    </div>
                    <div className='flex flex-col items-center justify-center mb-4 w-2/6 gap-y-2 '>
                        <input className="border rounded-sm focus:outline-none py-2 px-3 w-full" value={owner} onChange={(e) => setOwner(e.target.value)} placeholder='Insert your wallet address'></input>
                        
                    </div>
                    <div className='w-2/6 flex justify-center'>
                    <button className='py-3 bg-white rounded-sm w-full hover:bg-slate-100' onClick={() => {fetchNFTs(owner, contractAddress, setNFTs, contract, provider )}}>Search</button>
                    </div>
                </div>
            </header>

            <section className='flex flex-wrap justify-center'>
            {
                    NFTs ? NFTs.map(NFT => {
  
                        return (
                                     
                            <div>
                           <NFTCard id={NFT.id.tokenId } address={NFT.contract.address} name={NFT.contractMetadata.name} heroName={NFT.heroName} power={NFT.power} deduction={NFT.deduction} health={NFT.health} presence={NFT.presence} ></NFTCard>
                           
                           </div>
                        )
                    }) : <div>No NFTs found</div>
                }

            </section>
        </div>
    )
}  


export default MyPeeps;
