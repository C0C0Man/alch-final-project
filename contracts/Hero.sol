// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Hero is ERC721, Ownable {
    constructor() ERC721("Hero", "HRO") {
    }
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
    mapping(uint256 => string) public tokenNames;
    //stats
    mapping(uint256 => uint256) public power;
    mapping(uint256 => uint256) public quickness;
    mapping(uint256 => uint256) public intuition;
    mapping(uint256 => uint256) public intelect;
    mapping(uint256 => uint256) public health;
    mapping(uint256 => uint256) public presence;

    event TokenMinted(address indexed owner, uint256 indexed tokenId, string tokenName, uint256 stStat, uint256 quStat, uint256 intelStat, uint256 intuStat, uint256 healStat, uint256 presStat);

    function safeMint(
        address to, string memory name, 
        uint256 powerStat, uint256 quickStat, uint256 intuitionStat, 
        uint256 intStat, uint256 healthStat, uint256 presenceStat
        ) public onlyOwner {
        //stat requirements
        uint256 statTotal = powerStat + quickStat + intuitionStat + intStat + healthStat + presenceStat;
        require(powerStat >= 6, "Your Power is to low");
        require(powerStat <= 18, "You can't be that strong!");
        require(quickStat >= 6, "You're to slow!");
        require(quickStat <= 18, "You're to fast!");
        require(intuitionStat >= 6, "Your intuition is to low");
        require(intuitionStat <= 18, "You intuition is to high");
        require(intStat >= 6, "Your intelligence is to low");
        require(intStat <= 18, "Your intelligence is to high");
        require(healthStat >= 6, "Your health is to low");
        require(healthStat <= 18, "Your health is to high!");
        require(presenceStat >= 6, "Your presence is to low");
        require(presenceStat <= 18, "You presence is to high");
        require(statTotal == 75, "Stats must add up to 75");


        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        tokenNames[tokenId] = name;

        //Stat mapping
        power[tokenId] = powerStat;
        quickness[tokenId] = quickStat;
        intuition[tokenId] = intuitionStat;
        intelect[tokenId] = intStat;
        health[tokenId] = healthStat;
        presence[tokenId] = presenceStat;


        //Next step is to create and mint stats

         emit TokenMinted(msg.sender, tokenId, name, powerStat, quickStat, intuitionStat, intStat, healthStat, presenceStat); 
    }

    function getTokenName(uint256 tokenId) public view returns (string memory) {
        return tokenNames[tokenId];
    }

    // Stat functions

    function getTokenPower(uint256 tokenId) public view returns (uint256) {
        return power[tokenId];
    }

    function getTokenQuickness(uint256 tokenId) public view returns (uint256) {
        return quickness[tokenId];
    }

    function getTokenIntuition(uint256 tokenId) public view returns (uint256) {
        return intuition[tokenId];
    }

    function getTokenIntelect(uint256 tokenId) public view returns (uint256) {
        return intelect[tokenId];
    }

    function getTokenHealth(uint256 tokenId) public view returns (uint256) {
        return health[tokenId];
    }

    function getTokenPresence(uint256 tokenId) public view returns (uint256) {
        return presence[tokenId];
    }
}
