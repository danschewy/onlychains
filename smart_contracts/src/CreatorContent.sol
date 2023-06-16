pragma solidity 0.8.19; 

import "lib/solmate/src/tokens/ERC1155.sol";
import "lib/solmate/src/tokens/ERC20.sol";
import "lib/solmate/src/auth/Owned.sol";
import "lib/solmate/src/utils/LibString.sol";
import "lib/solmate/src/utils/SafeTransferLib.sol";

contract CreatorContent is ERC1155, Owned{
   
   using SafeTransferLib for ERC20;

    ERC20 immutable APE_COIN;

    string public BASE_URI;

    mapping(uint => uint) public pricing;

    constructor(string memory token_uri, address creator) Owned(creator){
        BASE_URI = token_uri;

        APE_COIN = ERC20(0x4d224452801ACEd8B2F0aebE155379bb5D594381);
    }

    function uri(uint id) public view virtual override returns (string memory) {
        return string.concat(BASE_URI, "/", LibString.toString(id));
    }

    function buy(uint id) public {
        require(balanceOf[msg.sender][id] == 0);
        SafeTransferLib.safeTransferFrom(APE_COIN, msg.sender, owner, pricing[id]);
        _mint(msg.sender, 1, id, "");
    }   

    function buyBatch(uint256[] memory ids, uint256[] memory amounts) public {
        uint total;
        for(uint i; i < ids.length; ++i) { 
            require(balanceOf[msg.sender][i] == 0);       
            total += pricing[i];  
        }
        SafeTransferLib.safeTransferFrom(APE_COIN, msg.sender, owner, total);
        _batchMint(msg.sender, ids, amounts, "");
    }   

    function setPrice(uint id, uint amount) public onlyOwner{
        pricing[id] = amount;
    }

}