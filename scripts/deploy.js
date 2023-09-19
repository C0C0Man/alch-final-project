const hre = require("hardhat");

async function main() {
  try{
    const Hero = await hre.ethers.getContractFactory("Hero");

    const hero = await Hero.deploy()

    await hero.waitForDeployment();

    console.log(
      `Contract deployed to ${hero.target}`

    );
  }catch (error) {
    console.error("Error deploying contract:", error);
    process.exitCode = 1;
  }
}



main()