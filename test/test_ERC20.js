
const ERC20 = artifacts.require("ERC20");

contract("ERC20", async (accounts) => {
    let owner = accounts[0];
    let instance;
    beforeEach(async () => {
        instance = await ERC20.new("LiberVanceTest", "LVT");
    });
    context("Deployment", async () => {
        it("right constructor args", async () => {
            const deployedName = await instance.name();
            const deployedSymbol = await instance.symbol();
            assert.equal(deployedName, "LiberVanceTest");
            assert.equal(deployedSymbol, "LVT");
        });
        it("minter should be the deployer", async () => {
            const deployedMinter = await instance.minter();
            assert.equal(deployedMinter, owner.toString());
        });
    });

    context("Token transfer", async () => {
        it("direct transfer", async () => {
            let result = await instance.transfer(accounts[1], "10", {from: owner});
            let recipantBalance = await instance.balanceOf(accounts[1]);
            assert.equal(result.receipt.status, true);
            assert.equal(recipantBalance.toString(), "10");
        });
        it("approval", async () => {
            let result = await instance.approve(accounts[1], "15", {from: owner});
            let spenderAllowance = await instance.allowance(owner,accounts[1]);
            assert.equal(result.receipt.status, true);
            assert.equal(spenderAllowance.toString(), "15");
        });
        it("transfer via approve", async () => {
            await instance.approve(accounts[1], "10", {from: owner});
            let result = await instance.transferFrom(owner, accounts[2], "10", {from: accounts[1]});
            let recipantBalance = await instance.balanceOf(accounts[2]);
            assert.equal(result.receipt.status, true);
            assert.equal(recipantBalance.toString(), "10");
        });
    });

    context("Token transfer should fail with:", async () => {
        it("exceeds balance", async () => {
            try {
                await instance.transfer(accounts[1], "10", { from: accounts[2] });
                assert.fail("Could not catch error");
            } catch(error) {
                expect(error.message).to.include("exceeds balance");
            }
        });
        it("invalid spender", async () => {
            await instance.approve(accounts[1], "10", {from: owner});
            try {
                await instance.transferFrom(owner, accounts[1], "10", {from: accounts[2]});
                assert.fail("Could not catch error");
            } catch(error) {
                expect(error.message).to.include('exceeds allowance');
            }
        });
        it("exceeds allowance", async () => {
            await instance.approve(accounts[1], "10", {from: owner});
            try {
                await instance.transferFrom(owner, accounts[2], "20", {from: accounts[1]});
                assert.fail("Could not catch error");
            } catch (error) {
                expect(error.message).to.include("exceeds allowance");
            }
        });
        it("transfer to the zero address", async () => {
            const zeroAddress = "0x0000000000000000000000000000000000000000";
            try {
                await instance.transfer(zeroAddress, "10", { from: owner });
                assert.fail('Could not catch error');
            } catch (error) {
                expect(error.message).to.include("zero address");
            }
        });
    });
});