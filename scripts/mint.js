const hre = require("hardhat");

const CONTRACT_ADDR = "no5FbDB2315678afecb367f032d93F642f64180aa3"; 

async function main() {
    const testAddress1 = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
    try{
        const hero = await hre.ethers.getContractAt("Hero", CONTRACT_ADDR)

        const deploy = await hero.safeMint(testAddress1, 'Howard');

        const tokenName = await hero.getTokenName(0);

        console.log(tokenName);



    }catch (error) {
    console.error("Error deploying contract:", error);
    process.exitCode = 1;
    }
}

main();