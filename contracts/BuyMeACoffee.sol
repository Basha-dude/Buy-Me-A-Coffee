// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract BuyMeACoffee {
    
    address payable public owner;

    event Withdrawal();

    constructor()  {
       

        
        owner = payable(msg.sender);
    }

    // function withdraw() public {
        

        // owner.transfer(address(this).balance);
    // }
}
