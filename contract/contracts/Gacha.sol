// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract Gacha {
  address public owner;

  constructor() {
    owner = msg.sender;
  }

  function gacha() public view returns (bytes32) {
    require(owner == msg.sender, "Only the owner can run gacha.");
    return keccak256("abc");
  }

  function random() private pure {

  }

}