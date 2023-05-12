
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
      transaction = await buyMeACoffee.connect(buyer).buyCoffee('basha', 'HI bash brooo',{value: ethers.utils.parseEther("50")})
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
    it("should not allow sending a memo without value", async function () {
      await expect(buyMeACoffee.buyCoffee('basha', 'HI bash brooo')).to.be.revertedWith("msg.value not received");
    });

    it("should allow owner to withdraw tips", async () => {
      const intialbalance =await owner.getBalance();
      console.log("intialbalance",intialbalance);
      const value = ethers.utils.parseEther("50");
      await buyMeACoffee.withdrawTips();
      const finalbalance = await owner.getBalance();
      console.log("finalbalance",finalbalance);
       expect(finalbalance.sub(intialbalance)).to.equal('49999960298993294185');
       console.log("finalbalance.sub(intialbalance)",finalbalance.sub(intialbalance));
    })
    it("should return the memo arary", async function () {
      const memos = await buyMeACoffee.getMemos();
      expect(memos.length).to.equal(1);
      expect(memos[0].from).to.equal(buyer.address);
      expect(memos[0].timestamp).to.be.gt(0);
      expect(memos[0].name).to.equal('basha');
      expect(memos[0].message).to.equal('HI bash brooo');
    });

    });
  })


  
    



