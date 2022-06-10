import { run, ethers, network } from "hardhat";
import { saveContract, getContracts } from "../utils";

async function main() {
  await run("compile");

  let name: string = 'token1';
  let symbol: string = 'TOKEN1';
  const supply: number = 0;
  let max: number = 0;

  const contracts = await getContracts()[network.name];
  const contractsName = Object.keys(contracts);
  for (const contractName of contractsName) {
    if (contractName.match(/^token\d/g)) {
      max = Math.max(max, +contractName.replace(/[^0-9]/g,'') + 1)
      name = 'token' + max;
      symbol = name.toUpperCase();
    }
  }

  const MockERC20 = await ethers.getContractFactory("MockERC20");
  const mockErc20 = await MockERC20.deploy(name, symbol, supply);
  await mockErc20.deployed();
  await saveContract(network.name, name, mockErc20.address);
  console.log(`Deployed ${name} to ${mockErc20.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
