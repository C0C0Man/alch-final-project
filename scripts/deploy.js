const hre = require("hardhat");

async function main() {
  try{
    const Hero = await hre.ethers.getContractFactory("Hero");

    const hero = await Hero.deploy('0xAb2DdD48A457b9FE1f7FeE45C6ce0f3D1062A1EA')

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