const { executeTransaction, balanceOf } = require('@algorand-builder/algob');
const { types } = require('@algorand-builder/runtime');

async function run (runtimeEnv, deployer) {
  // query gold ASA from deployer (using checkpoint information),
  const goldAsset = deployer.asa.get('gold');
  if (goldAsset === undefined) {
    console.error('Gold was not deployed. You must run `algob deploy` first.');
    return;
  }

  const goldAssetID = goldAsset.assetIndex;

  // query accounts from config
  const john = deployer.accountsByName.get('john');
  const goldOwner = deployer.accountsByName.get('alice');

  // execute asset transfer transaction
  await executeTransaction(deployer, {
    type: types.TransactionType.TransferAsset,
    sign: types.SignType.SecretKey,
    fromAccount: goldOwner,
    toAccountAddr: john.addr,
    amount: 1,
    assetID: goldAssetID,
    payFlags: {}
  });

  await balanceOf(deployer, john.addr, goldAssetID);
}

module.exports = { default: run };
