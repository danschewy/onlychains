pragma solidity 0.8.19;

import "lib/forge-std/src/Test.sol";
import "src/CreatorContent.sol";
import "src/Creators.sol";
import "src/TestToken.sol";
import "./interface/ISubscription.sol";
import "utils/VyperDeployer.sol";

contract CreatorTest is Test {
    VyperDeployer deployer = new VyperDeployer();
    ISubscription subsciptions;
    Creators c;
    TestToken t;
    function setUp() public {
        t = new TestToken();
        subsciptions = ISubscription(deployer.deployContract('Subscription', abi.encode(address(t))));
        c = new Creators();
        c.newCreator("", address(t));
    }


}