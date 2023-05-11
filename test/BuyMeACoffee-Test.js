
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Buy  Me A Coffee", () => {
  let buyMeACoffee
  beforeEach(async () => {
     [owner, buyer] = await ethers.getSigners();

    const BuyMeACoffee = await ethers.getContractFactory("BuyMeACoffee",owner);
      buyMeACoffee = await BuyMeACoffee.deploy();

    
  })

  it("should the owner match",async () => {
    expect(await buyMeACoffee.owner()).to.eq(owner.address)
  })

  describe('Buy Coffee', () => { 
    let transaction, result
    beforeEach(async () => {
      transaction = await buyMeACoffee.connect(buyer).buyCoffee('basha', 'HI bash brooo',{value: ethers.utils.parseEther("0.01")})
      result = await transaction.wait()
     
    }) 
    it("should the emit an event ",async () => {
      const event = result.events[0]
      const args = event.args;
       expect(event.event).to.eq('NewMemo');
       expect(args.from).to.eq(buyer.address);
       expect(args.timestamp).to.gt(0);
       expect(args.name).to.eq('basha');
       expect(args.message).to.eq('HI bash brooo');

    })
  })

}) 
  
    



