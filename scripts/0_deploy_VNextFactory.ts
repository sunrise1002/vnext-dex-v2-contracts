import { run, ethers, network } from "hardhat";
import { saveContract, getContracts } from "./utils";

async function main() {
  await run("compile");

  const contracts = await getContracts()[network.name];

  const VNextFactory = await ethers.getContractFactory("VNextFactory");
  const factory = await VNextFactory.deploy(contracts.admin);
  await factory.deployed();
  await saveContract(network.name, "factory", factory.address);
  console.log(`Deployed factory to ${factory.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
