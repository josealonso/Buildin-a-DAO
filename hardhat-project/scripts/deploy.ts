import { ethers } from "hardhat";
import { COMPLU_NFT_CONTRACT_ADDRESS } from "../constants";

async function main() {
  // Deploy the FakeNFTMarketplace contract first
  const FakeNFTMarketplace = await ethers.getContractFactory(
    "FakeNFTMarketplace"
  );
  const fakeNftMarketplace = await FakeNFTMarketplace.deploy();
  await fakeNftMarketplace.deployed();

  console.log("FakeNFTMarketplace deployed to: ", fakeNftMarketplace.address);

  // Now deploy the CompluDAO contract
  const CompluDAO = await ethers.getContractFactory("CompluDAO");
  const compluDAO = await CompluDAO.deploy(
    fakeNftMarketplace.address,
    COMPLU_NFT_CONTRACT_ADDRESS,
    {
      // Change this value as you want
      value: ethers.utils.parseEther("0.1"),
    }
  );
  await compluDAO.deployed();

  console.log("CompluDAO deployed to: ", compluDAO.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });