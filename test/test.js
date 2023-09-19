const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { ethers } = require("hardhat");


describe("Hero Contract", function () {
  async function deployTokenFixture(){
    //set up fixture to run for every test
    const Hero = await ethers.getContractFactory("Hero");
    const hero = await Hero.deploy();
    const [owner, addr1] = await ethers.getSigners();
    
    //mint a token
    const mintTx = await hero.safeMint(owner.address, "Howard", 16, 16, 11, 11, 11, 10);

    await mintTx.wait();
    
    
    return { hero, owner, addr1};


  }

  describe("Mint", function(){

    // Checking NFT, Owner and Name
    it("should mint an NFT", async function () {

      const { hero, owner } = await loadFixture(deployTokenFixture);

      expect(await hero.balanceOf(owner.address)).to.equal(1);
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
    it("Should set Power to 16", async function(){
      const {hero} = await loadFixture(deployTokenFixture);

      expect(await hero.getTokenPower(0)).to.equal(16);
    });
    it("Should set quick stat to 16", async function(){
      const {hero} = await loadFixture(deployTokenFixture);

      expect(await hero.getTokenQuickness(0)).to.equal(16);
    });

    it("Should set Intuition stat to 11", async function(){
      const {hero} = await loadFixture(deployTokenFixture);

      expect(await hero.getTokenIntuition(0)).to.equal(11);
    });

    it("Should set Intelect stat to 11", async function(){
      const {hero} = await loadFixture(deployTokenFixture);

      expect(await hero.getTokenIntelect(0)).to.equal(11);
    });

    it("Should set health stat to 11", async function(){
      const {hero} = await loadFixture(deployTokenFixture);

      expect(await hero.getTokenHealth(0)).to.equal(11);
    });

    it("Should set presence stat to 10", async function(){
      const {hero} = await loadFixture(deployTokenFixture);

      expect(await hero.getTokenPresence(0)).to.equal(10);
    });


    // Checking requirements
    it("Should fail if power is to low", async function() {
      const strength = 5;
      const Hero = await ethers.getContractFactory("Hero");
      const hero = await Hero.deploy();
      const [owner] = await ethers.getSigners();

      await expect(hero.safeMint(owner.address, "Howard", strength, 16, 11, 11, 11, 10)).to.be.revertedWith("Your Power is to low");
    });

    it("Should fail if power is to high", async function() {
      const strength = 19;
      const Hero = await ethers.getContractFactory("Hero");
      const hero = await Hero.deploy();
      const [owner] = await ethers.getSigners();

      await expect(hero.safeMint(owner.address, "Howard", strength, 10, 10, 10, 10, 10)).to.be.revertedWith("You can't be that strong!");
    });

    it("Should fail if quickness is to low", async function() {

      const Hero = await ethers.getContractFactory("Hero");
      const hero = await Hero.deploy();
      const [owner] = await ethers.getSigners();

      await expect(hero.safeMint(owner.address, "Howard", 16, 5, 11, 11, 11, 10)).to.be.revertedWith("You're to slow!");
    });

    it("Should fail if quickness is to high", async function() {
     
      const Hero = await ethers.getContractFactory("Hero");
      const hero = await Hero.deploy();
      const [owner] = await ethers.getSigners();

      await expect(hero.safeMint(owner.address, "Howard", 16, 19, 11, 11, 11, 10)).to.be.revertedWith("You're to fast!");
    });

    it("Should fail if intuition is to low", async function() {

      const Hero = await ethers.getContractFactory("Hero");
      const hero = await Hero.deploy();
      const [owner] = await ethers.getSigners();

      await expect(hero.safeMint(owner.address, "Howard", 16, 16, 5, 11, 11, 10)).to.be.revertedWith("Your intuition is to low");
    });

    it("Should fail if intuition is to high", async function() {
     
      const Hero = await ethers.getContractFactory("Hero");
      const hero = await Hero.deploy();
      const [owner] = await ethers.getSigners();

      await expect(hero.safeMint(owner.address, "Howard", 16, 16, 19, 11, 11, 10)).to.be.revertedWith("You intuition is to high");
    });

    it("Should fail if intelect is to low", async function() {

      const Hero = await ethers.getContractFactory("Hero");
      const hero = await Hero.deploy();
      const [owner] = await ethers.getSigners();

      await expect(hero.safeMint(owner.address, "Howard", 16, 16, 11, 5, 11, 10)).to.be.revertedWith("Your intelligence is to low");
    });

    it("Should fail if intelect is to high", async function() {
     
      const Hero = await ethers.getContractFactory("Hero");
      const hero = await Hero.deploy();
      const [owner] = await ethers.getSigners();

      await expect(hero.safeMint(owner.address, "Howard", 16, 16, 11, 19, 11, 10)).to.be.revertedWith("Your intelligence is to high");
    });

    it("Should fail if health is to low", async function() {

      const Hero = await ethers.getContractFactory("Hero");
      const hero = await Hero.deploy();
      const [owner] = await ethers.getSigners();

      await expect(hero.safeMint(owner.address, "Howard", 16, 16, 11, 11, 5, 10)).to.be.revertedWith("Your health is to low");
    });

    it("Should fail if health is to high", async function() {
     
      const Hero = await ethers.getContractFactory("Hero");
      const hero = await Hero.deploy();
      const [owner] = await ethers.getSigners();

      await expect(hero.safeMint(owner.address, "Howard", 16, 16, 11, 11, 19, 10)).to.be.revertedWith("Your health is to high!");
    });

    it("Should fail if presence is to low", async function() {

      const Hero = await ethers.getContractFactory("Hero");
      const hero = await Hero.deploy();
      const [owner] = await ethers.getSigners();

      await expect(hero.safeMint(owner.address, "Howard", 16, 16, 11, 11, 11, 1)).to.be.revertedWith("Your presence is to low");
    });

    it("Should fail if presence is to high", async function() {
     
      const Hero = await ethers.getContractFactory("Hero");
      const hero = await Hero.deploy();
      const [owner] = await ethers.getSigners();

      await expect(hero.safeMint(owner.address, "Howard", 16, 16, 11, 11, 11, 19)).to.be.revertedWith("You presence is to high");
    });

    //Checking total stats
    it("Should fail if total stat score is to low", async function() {

      const Hero = await ethers.getContractFactory("Hero");
      const hero = await Hero.deploy();
      const [owner] = await ethers.getSigners();

      await expect(hero.safeMint(owner.address, "Howard", 16, 16, 11, 11, 11, 12)).to.be.revertedWith("Stats must add up to 75");
    });

    it("Should fail if total stat score is to high", async function() {
     
      const Hero = await ethers.getContractFactory("Hero");
      const hero = await Hero.deploy();
      const [owner] = await ethers.getSigners();

      await expect(hero.safeMint(owner.address, "Howard", 16, 16, 11, 11, 10, 10)).to.be.revertedWith("Stats must add up to 75");
    });

    //Checking events

    describe("Events", function() {
      it("Should emit an event on safeMint", async function() {
        const {hero, owner, tokenId} = await loadFixture(deployTokenFixture);

        const name = await hero.getTokenName(0);

        await expect(hero.safeMint(owner, "Howard", 16, 16, 11, 11, 11, 10)).to.emit(hero, "TokenMinted").withArgs(owner.address, 1, name, 16, 16, 11, 11, 11, 10);
      });
    });

  });


});
