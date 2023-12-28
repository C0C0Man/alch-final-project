

const endpoint = `https://eth-sepolia.g.alchemy.com/v2/F46xckKupo-KfR19BuySB4Mr9djAy3ba`;


export async function fetchNFTs(owner, contractAddress, setNFTs, contract, provider, retryAttempt = 0) {
    const newArray = [];
  
    async function processNFTs(nfts) {
      for (const nft of nfts) {
        try {
          const options = {
            method: 'GET',
            headers: { accept: 'application/json' },
          };
          const response = await fetch(`${endpoint}/getNFTMetadata?contractAddress=${contractAddress}&tokenId=${nft.id.tokenId}&refreshCache=false`, options);
          const metadata = await response.json();
  

          const enrichedNFT = {
            ...metadata,
            heroName: await contract.getTokenName(nft.id.tokenId),
            power: await contract.getTokenPower(nft.id.tokenId),
            deduction: await contract.getTokenDeduction(nft.id.tokenId),
            health: await contract.getTokenHealth(nft.id.tokenId),
            presence: await contract.getTokenPresence(nft.id.tokenId)

          };
  
          newArray.push(enrichedNFT);
        } catch (err) {
          console.error(`Error processing NFT ${nft.id.tokenId}`, err);
        }
      }
  
      console.log("NFT metadata:", newArray);
      return newArray;
    }
  
    if (retryAttempt === 5) {
      return;
    }
  
    if (owner) {
      try {
        let data = await fetch(`${endpoint}/getNFTs?owner=${owner}${contractAddress ? `&contractAddresses%5B%5D=${contractAddress}` : ''}`).then(data => data.json());
        console.log("data:", data);
        const peepsNfts = data.ownedNfts;
        const enrichedNFTs = await processNFTs(peepsNfts);
        setNFTs(enrichedNFTs);
        return enrichedNFTs;
      } catch (e) {
        fetchNFTs(endpoint, owner, contractAddress, setNFTs, retryAttempt + 1);
      }
    }
  }
  