pragma solidity 0.8.19; 

import "./CreatorContent.sol";

contract Creators {

    mapping (address => address) public creators;
    
    function newCreator(string calldata uri, address currency) public {
        require(creators[msg.sender] == address(0), "Already Exists");
        CreatorContent addy = new CreatorContent(uri, msg.sender, currency);
        creators[msg.sender] = address(addy);
    }
}
