pragma solidity 0.8.19;

import "lib/solmate/src/tokens/ERC20.sol";

contract TestToken is ERC20 {
    constructor() ERC20("TT", "TestToken", 18){
        _mint(msg.sender, 10000e18);
    }


}