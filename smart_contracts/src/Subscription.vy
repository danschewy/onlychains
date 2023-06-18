# @version 0.3.9
# subscription.vy
# OnlyChains
from vyper.interfaces import ERC20
# consts for duration 

WEEK: constant(uint64) = 604800    
MONTH: constant(uint64) = 2629743
YEAR: constant(uint64) = 31556926 
APE_COIN: immutable(ERC20)

struct Subscription: 
    expiration: uint64
    amount: uint256
    duration: uint8

struct Tier:
    amount: uint256 
    duration: uint8 

creator_tiers: public(HashMap[address, HashMap[uint8, Tier]]) 
subs: public(HashMap[address, HashMap[address, Subscription]])

@external 
def __init__(addy: ERC20):
    APE_COIN = addy

@external
def create_tiers(amt: DynArray[uint256, 5], dur: DynArray[uint8, 5], tier_index: DynArray[uint8, 5]): 
    assert len(amt) == len(dur) and len(amt) == len(tier_index)
    for i in [0, 1, 2, 3, 4]:
        assert dur[i] < 3
        tier: Tier = Tier ({amount: amt[i], duration: dur[i]})
        self.creator_tiers[msg.sender][tier_index[i]] = tier 

@external
def edit_tier(amt: uint256, dur: uint8, tier_index: uint8):
    assert dur < 3
    tier: Tier = Tier ({amount: amt, duration: dur})
    self.creator_tiers[msg.sender][tier_index] = tier

@external 
def subscribe(creator: address, tier_index: uint8):
    time: uint64 = 0
    sub_tier: Tier = self.creator_tiers[creator][tier_index]
    expiration: uint64 = self.subs[msg.sender][creator].expiration
    assert expiration == 0 or convert(block.timestamp, uint64) >= expiration
    if sub_tier.duration == 0:
        time = WEEK
    elif sub_tier.duration == 1:
        time = MONTH
    else:
        time = YEAR
        
    self.subs[msg.sender][creator].expiration += convert(block.timestamp, uint64) + time
    APE_COIN.transferFrom(msg.sender, creator, sub_tier.amount)

@view
@external 
def check_expired(sub: address, creator: address) -> bool:
    exp: uint64 = self.subs[sub][creator].expiration
    if exp == 0:
        return True
    else:
        return convert(block.timestamp, uint64) >= exp
