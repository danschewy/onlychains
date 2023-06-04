// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "../lib/solmate/src/tokens/ERC20.sol";
import "../lib/solmate/src/utils/SafeTransferLib.sol";

contract OnlyChains {
    using SafeTransferLib for ERC20;
    uint64 constant WEEK = uint64(1 weeks);
    uint64 constant MONTH = uint64(30 days);
    uint64 constant YEAR = uint64(365 days);
    ERC20 constant APE_COIN = ERC20(0x4d224452801ACEd8B2F0aebE155379bb5D594381);
    
    enum Duration {
        weekly,
        monthly,
        yearly
    }

    struct Subscription {
        Duration duration;
        uint64 expiration;
        uint256 amount; 
    }
    struct Tier {
        uint256 amount;
        Duration duration;
    }

    mapping(address => mapping(uint8 => Tier)) public creatorTiers;
    mapping(address => mapping(address => Subscription)) public subs; 

    function createTiers(Tier[] calldata tiers, uint8 tierIndex) public {
        for (uint i; i < tiers.length; ++i) {
            creatorTiers[msg.sender][tierIndex] = tiers[i];
        }
    }
    function editTier(Tier calldata tier, uint8 tierIndex) public {
        creatorTiers[msg.sender][tierIndex] = tier;
    }
 
    function subscribe(address creator, uint8 tierIndex) public {
        // update state in subs mapping
        uint64 time; 
        Tier memory subTier = creatorTiers[creator][tierIndex];
        if (subTier.duration == Duration.weekly) {
            time = WEEK;
        } else if (subTier.duration == Duration.monthly) {
            time = MONTH;
        } else {
            time = YEAR;
        }
        subs[msg.sender][creator].expiration += time;
        // pay
        SafeTransferLib.safeTransferFrom(APE_COIN, msg.sender, creator, subTier.amount); 
        // emit event
    }

    function checkExpired(address sub, address creator) public view returns (bool) {
        return uint64(block.timestamp) <= subs[sub][creator].expiration;
    }
}
