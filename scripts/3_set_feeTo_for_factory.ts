import { run, ethers, network } from "hardhat";
import { getContracts } from "./utils";

async function main() {
  await run("compile");

  const contracts = await getContracts()[network.name];

  const factory = await ethers.getContractAt("VNextFactory", contracts.factory);
  await factory.setFeeTo(contracts.feeRecipient); // TODO: Update fee recipient in configs
  console.log(`Set fee to ${contracts.feeRecipient} success`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
