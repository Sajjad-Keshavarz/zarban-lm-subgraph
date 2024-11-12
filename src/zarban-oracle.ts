import { Bytes, Address, log } from '@graphprotocol/graph-ts';

import {
  BaseCurrencySet as WethSet,
} from '../generated/ZarbanOracle/ZarbanOracle';

import { getOrInitPriceOracle, getPriceOracleAsset } from './helpers/initializers';
import {
  exponentToBigInt,
} from './utils/converters';
import { WETHReserve } from '../generated/schema';

export function handleWethSet(event: WethSet): void {
  let wethAddress = event.params.baseCurrency;
  let weth = WETHReserve.load('weth');
  if (weth == null) {
    weth = new WETHReserve('weth');
  }
  weth.address = wethAddress;
  weth.name = 'Wrapped Ether';
  weth.symbol = 'WETH';
  weth.decimals = 18;
  weth.updatedTimestamp = event.block.timestamp.toI32();
  weth.updatedBlockNumber = event.block.number;
  weth.save();

  let oracleAsset = getPriceOracleAsset(wethAddress.toHexString());
  oracleAsset.priceInEth = exponentToBigInt(18);
  oracleAsset.lastUpdateTimestamp = event.block.timestamp.toI32();
  oracleAsset.save();
}
