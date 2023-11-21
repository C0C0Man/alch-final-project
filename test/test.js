const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { ethers } = require("hardhat");


describe("Hero Contract", function () {
  async function deployTokenFixture(){
    //set up fixture to run for every test
    const Hero = await ethers.getContractFactory("Hero");
    const [owner, addr1] = await ethers.getSigners();
    const hero = await Hero.deploy(owner.address);
    
    
    //mint a token
    const mintTx = await hero.safeMint(addr1.address, "Howard", 10, 10, 5, 5);

    await mintTx.wait();
    
    
    return { hero, owner, addr1};


  }

  describe("Mint", function(){

    // Checking NFT, Owner and Name
    it("should mint an NFT", async function () {

      const { hero, addr1 } = await loadFixture(deployTokenFixture);

      expect(await hero.balanceOf(addr1.address)).to.equal(1);
    });

    it("Should set right owner", async function(){
      const {hero, owner} = await loadFixture(deployTokenFixture);

      expect(await hero.owner()).to.equal(owner.address);
    });

    it("Should set token name to Howard", async function(){
      const {hero} = await loadFixture(deployTokenFixture);

      expect(await hero.getTokenName(0)).to.equal("Howard");
    });

    // Checking Stats
    it("Should set Power to 20", async function(){
      const {hero} = await loadFixture(deployTokenFixture);

      expect(await hero.getTokenPower(0)).to.equal(10);
    });
    it("Should set Deduction stat to 10", async function(){
      const {hero} = await loadFixture(deployTokenFixture);

      expect(await hero.getTokenDeduction(0)).to.equal(10);
    });

    it("Should set health stat to 5", async function(){
      const {hero} = await loadFixture(deployTokenFixture);

      expect(await hero.getTokenHealth(0)).to.equal(5);
    });

    it("Should set presence stat to 5", async function(){
      const {hero} = await loadFixture(deployTokenFixture);

      expect(await hero.getTokenPresence(0)).to.equal(5);
    });


    // Checking requirements
    it("Should fail if power is to low", async function() {
      const strength = 1;
      const Hero = await ethers.getContractFactory("Hero");
      const [owner] = await ethers.getSigners();
      const hero = await Hero.deploy(owner.address);
      

      await expect(hero.safeMint(owner.address, "Howard", strength, 10, 10, 8)).to.be.revertedWith("Your Power is to low");
    });

    it("Should fail if power is to high", async function() {
      const strength = 19;
      const Hero = await ethers.getContractFactory("Hero");
      const [owner] = await ethers.getSigners();
      const hero = await Hero.deploy(owner.address);

      await expect(hero.safeMint(owner.address, "Howard", strength, 10, 10, 10)).to.be.revertedWith("You can't be that strong!");
    });

    it("Should fail if deduction is to low", async function() {

      const Hero = await ethers.getContractFactory("Hero");
      const [owner] = await ethers.getSigners();
      const hero = await Hero.deploy(owner.address);

      await expect(hero.safeMint(owner.address, "Howard", 10, 1, 10, 10)).to.be.revertedWith("You're deduction is to low");
    });

    it("Should fail if deduction is to high", async function() {
     
      const Hero = await ethers.getContractFactory("Hero");
      const [owner] = await ethers.getSigners();
      const hero = await Hero.deploy(owner.address);

      await expect(hero.safeMint(owner.address, "Howard", 10, 19, 10, 10)).to.be.revertedWith("You're deduction is to high!");
    });

    it("Should fail if health is to low", async function() {

      const Hero = await ethers.getContractFactory("Hero");
      const [owner] = await ethers.getSigners();
      const hero = await Hero.deploy(owner.address);

      await expect(hero.safeMint(owner.address, "Howard", 10, 10, 1, 10)).to.be.revertedWith("Your health is to low");
    });

    it("Should fail if health is to high", async function() {
     
      const Hero = await ethers.getContractFactory("Hero");
      const [owner] = await ethers.getSigners();
      const hero = await Hero.deploy(owner.address);

      await expect(hero.safeMint(owner.address, "Howard", 10, 10, 11, 10)).to.be.revertedWith("Your health is to high!");
    });

    it("Should fail if presence is to low", async function() {

      const Hero = await ethers.getContractFactory("Hero");
      const [owner] = await ethers.getSigners();
      const hero = await Hero.deploy(owner.address);

      await expect(hero.safeMint(owner.address, "Howard", 10, 10, 10, 1)).to.be.revertedWith("Your presence is to low");
    });

    it("Should fail if presence is to high", async function() {
     
      const Hero = await ethers.getContractFactory("Hero");
      const [owner] = await ethers.getSigners();
      const hero = await Hero.deploy(owner.address);

      await expect(hero.safeMint(owner.address, "Howard", 10, 10, 10, 11)).to.be.revertedWith("You presence is to high");
    });

    //Checking total stats
    it("Should fail if total stat score is to low", async function() {

      const Hero = await ethers.getContractFactory("Hero");
      const [owner] = await ethers.getSigners();
      const hero = await Hero.deploy(owner.address);

      await expect(hero.safeMint(owner.address, "Howard", 10, 2, 2, 2)).to.be.revertedWith("Stats must total must equal 30!");
    });

    it("Should fail if total stat score is to high", async function() {
     
      const Hero = await ethers.getContractFactory("Hero");
      const [owner] = await ethers.getSigners();
      const hero = await Hero.deploy(owner.address);

      await expect(hero.safeMint(owner.address, "Howard", 10, 10, 10, 10)).to.be.revertedWith("Stats must total must equal 30!");
    });

    //Checking events

    describe("Events", function() {
      it("Should emit an event on safeMint", async function() {
        const {hero, owner, tokenId} = await loadFixture(deployTokenFixture);

        const name = await hero.getTokenName(0);

        await expect(hero.safeMint(owner, "Howard", 10, 10, 5, 5)).to.emit(hero, "TokenMinted").withArgs(owner.address, 1, name, 10, 10, 5, 5);
      });
    });

  });


});
