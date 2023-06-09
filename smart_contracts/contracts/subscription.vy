# @version 0.3.9
# subscription.vy
# OnlyChains
from vyper.interfaces import ERC20
# consts for duration 

WEEK: constant(uint64) = 604800    
MONTH: constant(uint64) = 2629743
YEAR: constant(uint64) = 31556926 
APE_COIN: immutable(ERC20)

enum Duration:
    Weekly
    Monthly
    Yearly

struct Subscription: 
    expiration: uint64
    amount: uint256
    duration: Duration

struct Tier:
    amount: uint256 
    duration: Duration 

creator_tiers: HashMap[address, HashMap[uint8, Tier]] 
subs: HashMap[address, HashMap[address, Subscription]]

@external 
def __init__():
    APE_COIN = ERC20(0x4d224452801ACEd8B2F0aebE155379bb5D594381)

@external
def create_tiers(tier: DynArray[Tier, 5], tier_index: uint8): 
    for i in tier:
        self.creator_tiers[msg.sender][tier_index] = i 

@external
def edit_tier(tier: Tier, tier_index: uint8):
    self.creator_tiers[msg.sender][tier_index] = tier

@external 
def subscribe(creator: address, tier_index: uint8):
    time: uint64 = 0
    sub_tier: Tier = self.creator_tiers[creator][tier_index]

    if sub_tier.duration == Duration.Weekly:
        time = WEEK
    elif sub_tier.duration == Duration.Monthly:
        time = MONTH
    else:
        time = YEAR
    
    if self.subs[msg.sender][creator].expiration == 0:
        self.subs[msg.sender][creator].expiration = convert(block.timestamp, uint64)
        
    self.subs[msg.sender][creator].expiration += time
    APE_COIN.transferFrom(msg.sender, creator, sub_tier.amount)

@view
@external 
def check_expired(sub: address, creator: address) -> bool:
    return convert(block.timestamp, uint64) <= self.subs[sub][creator].expiration
