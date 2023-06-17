pragma solidity ^0.8.19;

interface ISubscription{
    
    struct Tier {uint256 amount; uint8 duration;}
    struct Subscription {uint64 expiration; uint256 amount; uint8 duration;}
    function create_tiers(uint256[5] calldata amt, uint8[5] calldata dur, uint8[5] calldata tier_index) external;
    function edit_tier(uint256 amt, uint8 dur, uint8 tier_index) external;
    function subscribe(address creator, uint8 tier_index) external;
    function check_expired(address sub, address creator) external view returns (bool);
    function creator_tiers(address creator, uint8 index) external view returns(Tier calldata);
    function subs(address subscriber, address creator) external view returns (Subscription calldata);

}