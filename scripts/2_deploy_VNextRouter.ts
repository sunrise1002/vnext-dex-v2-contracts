import { run, ethers, network } from "hardhat";
import { saveContract, getContracts } from "./utils";

async function main() {
  await run("compile");

  const contracts = await getContracts()[network.name];

  const VNextRouter = await ethers.getContractFactory("VNextRouter");
  const router = await VNextRouter.deploy(contracts.factory, contracts.wbnb);
  await router.deployed();
  await saveContract(network.name, "router", router.address);
  console.log(`Deployed router to ${router.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
