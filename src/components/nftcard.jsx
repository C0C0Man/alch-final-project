import './nftcard.css'; // Import the CSS file

const NFTCard = ({ id, address, name, heroName, power, deduction, health, presence }) => {
  return (
    <div className="nft-card">
      <div className="header">
        <h3 className="nft-card-name">{name}</h3>
        <p className="nft-card-address">
          <a href={`https://sepolia.etherscan.io/token/${address}`} target="_blank">
          {`${address.slice(0, 4)}...${address.slice(address.length - 4)}`}
          </a>
        </p>
        <p>{`${id.slice(0, 4)}...${id.slice(id.length - 4)}`}</p>
      </div>
      <div className="info-section">
        <p>Hero NFT</p>
        <p className="hero-name">Hero Name: {heroName}</p>
        <div className="stat-section">
          <span className="stat-label">Hero Power:</span>
          <span className="stat-value power-value">{Number(power)}</span>
        </div>
        <div className="stat-section">
          <span className="stat-label">Hero Deduction:</span>
          <span className="stat-value deduction-value">{Number(deduction)}</span>
        </div>
        <div className="stat-section">
          <span className="stat-label">Hero Health:</span>
          <span className="stat-value health-value">{Number(health)}</span>
        </div>
        <div className="stat-section">
          <span className="stat-label">Hero Presence:</span>
          <span className="stat-value presence-value">{Number(presence)}</span>
        </div>
      </div>    
    </div>
  );
};

export default NFTCard;
