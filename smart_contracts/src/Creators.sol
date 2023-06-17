pragma solidity 0.8.19; 

import "./CreatorContent.sol";

contract Creators {

    mapping (address => CreatorContent) public creators;
    
    function newCreator(string calldata uri, address currency) public {
        CreatorContent addy = new CreatorContent(uri, msg.sender, currency);
        creators[msg.sender] = addy;
    }
}
