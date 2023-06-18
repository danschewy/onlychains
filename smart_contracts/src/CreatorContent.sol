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
    mapping(uint256 => bool) public valid; 
    constructor(string memory token_uri, address creator, address currency) Owned(creator){
        BASE_URI = token_uri;
        owner = creator;
        APE_COIN = ERC20(currency);
    }

    function uri(uint id) public view virtual override returns (string memory) {
        return string.concat(BASE_URI, "/", LibString.toString(id));
    }

    function buy(uint id) public {
        require(balanceOf[msg.sender][id] == 0, "Already purchased");
        SafeTransferLib.safeTransferFrom(APE_COIN, msg.sender, owner, pricing[id]);
        _mint(msg.sender, 1, id, "");
    }   

    function buyBatch(uint256[] memory ids, uint256[] memory amounts) public {
        require(ids.length == amounts.length, "Mismatched Array Len");
        uint total;
        for(uint i; i < ids.length; ++i) { 
            require(balanceOf[msg.sender][ids[i]] == 0);
            require(amounts[i] == 1, "Only one");
            require(valid[ids[i]], "Uninitialized");              
            total += pricing[i];  
        }
        SafeTransferLib.safeTransferFrom(APE_COIN, msg.sender, owner, total);
        _batchMint(msg.sender, ids, amounts, "");
    }   

    function setPriceInit(uint id, uint amount) public onlyOwner{
        valid[id] = true;
        pricing[id] = amount;
    }
    
    function editSet(uint id, uint amount, bool state) public onlyOwner{
        valid[id] = state;
        pricing[id] = amount;
    }
}
