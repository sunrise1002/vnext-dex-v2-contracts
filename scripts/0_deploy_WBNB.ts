import { run, ethers, network } from "hardhat";
import { saveContract } from "./utils";

async function main() {
  await run("compile");

  const WBNB = await ethers.getContractFactory("WBNB");
  const wbnb = await WBNB.deploy();
  await wbnb.deployed();
  await saveContract(network.name, "wbnb", wbnb.address);
  console.log(`Deployed wbnb to ${wbnb.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
