// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with ` <npx hardhat runscript>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const { ethers } = hre;

// returns the ether balance of the given address
async function getBalance(address) {
const balanceBigInt = await ethers.provider.getBalance(address);

  return hre.ethers.utils.formatEther(balanceBigInt)
  
}

 async function printBalances(addresses) {
    let idx = 0;
    for(const address of addresses){  
      console.log(`Address ${idx}balance`,await getBalance(address));
      idx++;
    }
 }
 async function printMemos(memos) {
  for(const memo of memos) {
    const timestamp = memo.timestamp;
    const tipper = memo.name;
    const tipperAddress = memo.from;
    const message = memo.message;
    console.log(`At ${timestamp},${ tipper } ${tipperAddress} said: "${message}"`);
  }
 }
async function main() {

  //GET EXAMPLE ACCOUNTS
  const[owner,tipper,tipper1,tipper2] = await  hre.ethers.getSigners();

  // contracts instance 
  const BuyMeACoffee = await hre.ethers.getContractFactory("BuyMeACoffee",owner);
  const buyMeACoffee = await BuyMeACoffee.deploy();
  await buyMeACoffee.deployed();
  console.log("BUY ME A COFFEE ADDRESS",buyMeACoffee.address);

  //Check the balance before purchase
  const addresses = [owner.address,tipper.address,buyMeACoffee.address]
  console.log("======START======");
  await printBalances(addresses);
  

  //BUY THE OWNER A FEW COFFEES
  const tip = {value: hre.ethers.utils.parseEther("1")};

  await buyMeACoffee.connect(tipper).buyCoffee("Royal","Hi Bash its me royal",tip)
  await buyMeACoffee.connect(tipper1).buyCoffee("Naseer","Hi Bash its me Naseer",tip)
  await buyMeACoffee.connect(tipper2).buyCoffee("Nagoor","Hi Bash its me Nagoor",tip)

  //CHECK BALANCE OF COFFEE PURCHASE
  console.log("======AFTER A BOUGHT COFFEE======");
  await printBalances(addresses);
  

  //WITHDRAW FUNDS
    await buyMeACoffee.withdrawTips();

  //CHECK BALANCE AFTER THE WITHDRAW
  console.log("====== WITHDRAW TIPS======");
  await printBalances(addresses);
  

  //READ ALL MEMOS LEFT FOR OWNER
  const memos = await buyMeACoffee.getMemos()
  await printMemos(memos);


}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
