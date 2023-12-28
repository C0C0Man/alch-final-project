const NFTCard = ({ id, address, name, heroName, power, deduction, health, presence}) => {
    return (
        <div className="w-1/4 mr-3 mb-4 bg-slate-100 rounded-md" >
            <div className="p-3">
                <div className="flex mb-3">
                    <div className="flex-grow">
                        <h3 className="text-xl">{name}</h3>
                        <p>{`${id.slice(0, 4)}...${id.slice(id.length - 4)}`}</p>
                    </div>
                    <div className="flex mr-3">
                        <a target="_blank" className="text-blue-700" href={`https://sepolia.etherscan.io/token/${address}`}>{`${address.slice(0, 4)}...${address.slice(address.length - 4)}`}</a>
                    </div>
                </div>
                <p>Hero NFT</p>
                <p>Hero Name: {heroName}</p>
                <p>Hero Power: {Number(power)}</p>
                <p>Hero deduction: {Number(deduction)}</p>
                <p>Hero Health: {Number(health)}</p>
                <p>Hero presence: {Number(presence)}</p>
            </div>
            <div className="flex flex-wrap justify-center items-center p-3 ">

                <div>
                   
                </div>
            </div>
        </div>
    )
}

export default NFTCard;