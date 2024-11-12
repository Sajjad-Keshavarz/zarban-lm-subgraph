import { Address, BigInt, ethereum, log } from '@graphprotocol/graph-ts';

import {
  PriceHistoryItem,
  PriceOracle,
  PriceOracleAsset,
} from '../../generated/schema';
import { getOrInitPriceOracle, getPriceOracleAsset } from './initializers';
import { ZarbanOracle } from '../../generated/ZarbanOracle/ZarbanOracle';

export function savePriceToHistory(oracleAsset: PriceOracleAsset, event: ethereum.Event): void {
  let id = oracleAsset.id + event.block.number.toString() + event.transaction.index.toString();
  let priceHistoryItem = new PriceHistoryItem(id);
  priceHistoryItem.asset = oracleAsset.id;
  priceHistoryItem.price = oracleAsset.priceInEth;
  priceHistoryItem.timestamp = oracleAsset.lastUpdateTimestamp;
  priceHistoryItem.save();
}



export function updateDependentAssets(dependentAssets: string[], event: ethereum.Event): void {
  let proxyPriceProviderAddress = getOrInitPriceOracle().proxyPriceProvider;
  let proxyPriceProvider = ZarbanOracle.bind(
    Address.fromString(proxyPriceProviderAddress.toHexString())
  );

  // update dependent assets price
  for (let i = 0; i < dependentAssets.length; i += 1) {
    let dependentAsset = dependentAssets[i];
    let dependentOracleAsset = getPriceOracleAsset(dependentAsset);
    let assetPrice = proxyPriceProvider.try_getAssetPrice(
      Address.fromString(dependentOracleAsset.id)
    );
    if (!assetPrice.reverted) {
      dependentOracleAsset.priceInEth = assetPrice.value;
    } else {
      log.error(
        'DependentAsset: {} | OracleAssetId: {} | proxyPriceProvider: {} | EventAddress: {}',
        [
          dependentAsset,
          dependentOracleAsset.id,
          proxyPriceProviderAddress.toHexString(),
          event.address.toHexString(),
        ]
      );
    }
    dependentOracleAsset.save();
    savePriceToHistory(dependentOracleAsset, event);
  }
}


export function genericPriceUpdate(
  oracleAsset: PriceOracleAsset,
  price: BigInt,
  event: ethereum.Event
): void {
  oracleAsset.priceInEth = price;
  oracleAsset.lastUpdateTimestamp = event.block.timestamp.toI32();
  oracleAsset.save();
  // add new price to history
  savePriceToHistory(oracleAsset, event);
  updateDependentAssets(oracleAsset.dependentAssets, event);
}
