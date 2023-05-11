// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract BuyMeACoffee {

    address payable public  owner;

    struct Memo {
        address from;
        uint256 timestamp;
        string name;
        string message;
    }

    Memo[] public memos;
    event NewMemo(
        address from,
        uint256 timestamp,
        string name,
        string message
    );



    constructor()  {
       owner = payable(msg.sender);
    }
    
      function buyCoffee(string memory sender, string memory message) public payable {
        
        memos.push(Memo(
                msg.sender,
                block.timestamp,
                sender,
                message
            ));
            emit NewMemo(msg.sender,block.timestamp,sender,message);
          } 
    // function withdraw() public {
        

        // owner.transfer(address(this).balance);
    // }
}
