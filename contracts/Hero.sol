// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract Hero is ERC721, Ownable {
    uint256 private _nextTokenId;

    constructor(address initialOwner)
        ERC721("Hero", "HRO")
        Ownable(initialOwner)
    {}
    mapping(uint256 => string) public tokenNames;
    //stats
    mapping(uint256 => uint256) public power;
    mapping(uint256 => uint256) public deduction;
    mapping(uint256 => uint256) public health;
    mapping(uint256 => uint256) public presence;

    event TokenMinted(address indexed owner, uint256 indexed tokenId, string tokenName, uint256 pwStat, uint256 dedStat, uint256 healStat, uint256 presStat);

    function safeMint(
        address to, string memory name, 
        uint256 powerStat, uint256 deductionStat, uint256 healthStat, uint256 presenceStat
        ) public {
        uint256 tokenId = _nextTokenId++;
        //stat requirements
        uint256 statTotal = powerStat + deductionStat + healthStat + presenceStat;
        require(powerStat >= 2, "Your Power is to low");
        require(powerStat <= 10, "You can't be that strong!");
        require(deductionStat >= 2, "You're deduction is to low");
        require(deductionStat <= 10, "You're deduction is to high!");
        require(healthStat >= 2, "Your health is to low");
        require(healthStat <= 10, "Your health is to high!");
        require(presenceStat >= 2, "Your presence is to low");
        require(presenceStat <= 10, "You presence is to high");
        require(statTotal == 30, "Stats must total must equal 30!");


        _safeMint(to, tokenId);
        tokenNames[tokenId] = name;

        //Stat mapping
        power[tokenId] = powerStat;
        deduction[tokenId] = deductionStat;
        health[tokenId] = healthStat;
        presence[tokenId] = presenceStat;


        //Next step is to create and mint stats

         emit TokenMinted(msg.sender, tokenId, name, powerStat, deductionStat, healthStat, presenceStat); 
    }

    function getTokenName(uint256 tokenId) public view returns (string memory) {
        return tokenNames[tokenId];
    }

    // Stat functions

    function getTokenPower(uint256 tokenId) public view returns (uint256) {
        return power[tokenId];
    }

    function getTokenDeduction(uint256 tokenId) public view returns (uint256) {
        return deduction[tokenId];
    }

    function getTokenHealth(uint256 tokenId) public view returns (uint256) {
        return health[tokenId];
    }

    function getTokenPresence(uint256 tokenId) public view returns (uint256) {
        return presence[tokenId];
    }
}
