require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config({path: '../.env'});


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  paths: {
    artifacts: './src/artifacts',
  },
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.A_SEP_KEY}`,
      accounts: [process.env.SEP_PRIV_KEY],
    }
  }
};
