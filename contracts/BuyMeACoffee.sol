// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";


// DEPLOYED TO THIS ADDRESS : "0x5FbDB2315678afecb367f032d93F642f64180aa3"

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
                require(msg.value > 0,"msg.value not received");
        memos.push(Memo(
                msg.sender,
                block.timestamp,
                sender,
                message
            ));
            emit NewMemo(msg.sender,block.timestamp,sender,message);
          } 

          function withdrawTips() public {
            owner.transfer(address(this).balance);
         }
          function getMemos() public view returns( Memo[] memory) {
            return memos;
          }

         
}
