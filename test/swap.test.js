/* eslint-disable no-unused-expressions */
// WIP

const { use, expect } = require("chai");
const { BigNumber } = require("ethers");
const { solidity } = require("ethereum-waffle");
const { ethers, upgrades } = require("hardhat");

use(solidity);

const toBN = (n) => BigNumber.from(n);
const expandTo18Decimals = (x) =>
  BigNumber.from(x).mul(BigNumber.from(10).pow(18));

describe("Dex testing:", () => {
  let player1, player2, player3, player4, player5, wbnb, factory, router, token1, token2;

  beforeEach(async () => {
    [admin, player1, player2, player3, player4, player5] =
      await ethers.getSigners();

    // Contract deployment
    const WBNB = await ethers.getContractFactory("WBNB");
    wbnb = await WBNB.deploy();
    await wbnb.deployed();

    const MockERC20_1 = await ethers.getContractFactory("MockERC20");
    token1 = await MockERC20_1.deploy('token1', 'TOKEN1', 0);
    await token1.deployed();

    const MockERC20_2 = await ethers.getContractFactory("MockERC20");
    token2 = await MockERC20_2.deploy('token2', 'TOKEN2', 0);
    await token2.deployed();

    const VNextFactory = await ethers.getContractFactory("VNextFactory");
    factory = await VNextFactory.deploy(admin.address);
    await factory.deployed();

    const VNextRouter = await ethers.getContractFactory("VNextRouter");
    router = await VNextRouter.deploy(factory.address, wbnb.address);
    await router.deployed();

    await factory.setFeeTo(admin.address);

    await token1.connect(admin).mintTokens(expandTo18Decimals(1000));
    await token2.connect(admin).mintTokens(expandTo18Decimals(105));

    await token1.connect(admin).approve(router.address, expandTo18Decimals(100000000));
    await token2.connect(admin).approve(router.address, expandTo18Decimals(100000000));
  });

  describe("Add liquidity", () => {
    it("Add liquidity", async () => {
      await router.connect(admin).addLiquidity(
        token1.address,
        token2.address,
        expandTo18Decimals(1000),
        expandTo18Decimals(100),
        expandTo18Decimals(1000),
        expandTo18Decimals(100),
        admin.address,
        `${Math.round(Date.now() / 1000) + 10000}`
      );
    });
  });
});
