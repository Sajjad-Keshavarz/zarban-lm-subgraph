import {
  BalanceTransfer as ZTokenTransfer,
  Mint as ZTokenMint,
  Burn as ZTokenBurn,
} from '../generated/templates/ZToken/ZToken';

import {
  ZTokenBalanceHistoryItem,
  UserReserve,
  Reserve,
} from '../generated/schema';
import {
  getOrInitZToken,
  getOrInitReserve,
  getOrInitUserReserve,
  getPriceOracleAsset,
  getOrInitPriceOracle,
  getOrInitReserveParamsHistoryItem,
} from './helpers/initializers';
import { calculateUtilizationRate } from './helpers/reserve-logic';
import { Address, BigInt, ethereum, log } from '@graphprotocol/graph-ts';
import { rayDiv, rayMul } from './helpers/math';



function saveUserReserveZHistory(
  userReserve: UserReserve,
  event: ethereum.Event,
  index: BigInt
): void {
  let zTokenBalanceHistoryItem = new ZTokenBalanceHistoryItem(
    userReserve.id + event.transaction.hash.toHexString()
  );
  zTokenBalanceHistoryItem.scaledZTokenBalance = userReserve.scaledZTokenBalance;
  zTokenBalanceHistoryItem.currentZTokenBalance = userReserve.currentZTokenBalance;
  zTokenBalanceHistoryItem.userReserve = userReserve.id;
  zTokenBalanceHistoryItem.index = index;
  zTokenBalanceHistoryItem.timestamp = event.block.timestamp.toI32();
  zTokenBalanceHistoryItem.save();
}


function saveReserve(reserve: Reserve, event: ethereum.Event): void {
  reserve.utilizationRate = calculateUtilizationRate(reserve);
  reserve.save();

  let reserveParamsHistoryItem = getOrInitReserveParamsHistoryItem(event.transaction.hash, reserve);
  reserveParamsHistoryItem.totalScaledVariableDebt = reserve.totalScaledVariableDebt;
  reserveParamsHistoryItem.totalCurrentVariableDebt = reserve.totalCurrentVariableDebt;
  reserveParamsHistoryItem.totalPrincipalStableDebt = reserve.totalPrincipalStableDebt;
  reserveParamsHistoryItem.lifetimePrincipalStableDebt = reserve.lifetimePrincipalStableDebt;
  reserveParamsHistoryItem.lifetimeScaledVariableDebt = reserve.lifetimeScaledVariableDebt;
  reserveParamsHistoryItem.lifetimeCurrentVariableDebt = reserve.lifetimeCurrentVariableDebt;
  reserveParamsHistoryItem.lifetimeLiquidity = reserve.lifetimeLiquidity;
  reserveParamsHistoryItem.lifetimeBorrows = reserve.lifetimeBorrows;
  reserveParamsHistoryItem.lifetimeRepayments = reserve.lifetimeRepayments;
  reserveParamsHistoryItem.lifetimeWithdrawals = reserve.lifetimeWithdrawals;
  reserveParamsHistoryItem.lifetimeLiquidated = reserve.lifetimeLiquidated;
  reserveParamsHistoryItem.lifetimeFlashLoanPremium = reserve.lifetimeFlashLoanPremium;
  reserveParamsHistoryItem.lifetimeFlashLoans = reserve.lifetimeFlashLoans;
  // reserveParamsHistoryItem.lifetimeStableDebFeeCollected = reserve.lifetimeStableDebFeeCollected;
  // reserveParamsHistoryItem.lifetimeVariableDebtFeeCollected = reserve.lifetimeVariableDebtFeeCollected;
  reserveParamsHistoryItem.lifetimeReserveFactorAccrued = reserve.lifetimeReserveFactorAccrued;
  reserveParamsHistoryItem.lifetimeDepositorsInterestEarned =
    reserve.lifetimeDepositorsInterestEarned;
  reserveParamsHistoryItem.availableLiquidity = reserve.availableLiquidity;
  reserveParamsHistoryItem.totalLiquidity = reserve.totalLiquidity;
  reserveParamsHistoryItem.totalLiquidityAsCollateral = reserve.totalLiquidityAsCollateral;
  reserveParamsHistoryItem.utilizationRate = reserve.utilizationRate;
  reserveParamsHistoryItem.variableBorrowRate = reserve.variableBorrowRate;
  reserveParamsHistoryItem.variableBorrowIndex = reserve.variableBorrowIndex;
  reserveParamsHistoryItem.stableBorrowRate = reserve.stableBorrowRate;
  reserveParamsHistoryItem.liquidityIndex = reserve.liquidityIndex;
  reserveParamsHistoryItem.liquidityRate = reserve.liquidityRate;
  reserveParamsHistoryItem.totalZTokenSupply = reserve.totalZTokenSupply;
  reserveParamsHistoryItem.averageStableBorrowRate = reserve.averageStableRate;
  let priceOracleAsset = getPriceOracleAsset(reserve.price);
  reserveParamsHistoryItem.priceInEth = priceOracleAsset.priceInEth;

  let priceOracle = getOrInitPriceOracle();
  reserveParamsHistoryItem.priceInUsd = reserveParamsHistoryItem.priceInEth
    .toBigDecimal()
    .div(priceOracle.usdPriceEth.toBigDecimal());

  reserveParamsHistoryItem.timestamp = event.block.timestamp.toI32();
  reserveParamsHistoryItem.save();
}

function tokenBurn(event: ethereum.Event, from: Address, value: BigInt, index: BigInt): void {
  let zToken = getOrInitZToken(event.address);
  let userReserve = getOrInitUserReserve(from, zToken.underlyingAssetAddress, event);
  let poolReserve = getOrInitReserve(zToken.underlyingAssetAddress, event);

  let calculatedAmount = rayDiv(value, index);

  userReserve.scaledZTokenBalance = userReserve.scaledZTokenBalance.minus(calculatedAmount);
  userReserve.currentZTokenBalance = rayMul(userReserve.scaledZTokenBalance, index);
  userReserve.variableBorrowIndex = poolReserve.variableBorrowIndex;
  userReserve.liquidityRate = poolReserve.liquidityRate;

  // TODO: review liquidity?
  poolReserve.totalDeposits = poolReserve.totalDeposits.minus(value);
  // poolReserve.availableLiquidity = poolReserve.totalDeposits
  //   .minus(poolReserve.totalPrincipalStableDebt)
  //   .minus(poolReserve.totalScaledVariableDebt);

  poolReserve.availableLiquidity = poolReserve.availableLiquidity.minus(value);
  poolReserve.totalZTokenSupply = poolReserve.totalZTokenSupply.minus(value);

  poolReserve.totalLiquidity = poolReserve.totalLiquidity.minus(value);
  poolReserve.lifetimeWithdrawals = poolReserve.lifetimeWithdrawals.plus(value);

  if (userReserve.usageAsCollateralEnabledOnUser) {
    poolReserve.totalLiquidityAsCollateral = poolReserve.totalLiquidityAsCollateral.minus(value);
  }
  saveReserve(poolReserve, event);

  userReserve.lastUpdateTimestamp = event.block.timestamp.toI32();
  userReserve.save();
  saveUserReserveZHistory(userReserve, event, index);
}

function tokenMint(event: ethereum.Event, from: Address, value: BigInt, index: BigInt): void {
  let zToken = getOrInitZToken(event.address);
  let poolReserve = getOrInitReserve(zToken.underlyingAssetAddress, event);
  poolReserve.totalZTokenSupply = poolReserve.totalZTokenSupply.plus(value);
  // Check if we are minting to treasury for mainnet and polygon
  if (
    from.toHexString() != '0x464c71f6c2f760dda6093dcb91c24c39e5d6e18c' &&
    from.toHexString() != '0x7734280a4337f37fbf4651073db7c28c80b339e9'
  ) {
    let userReserve = getOrInitUserReserve(from, zToken.underlyingAssetAddress, event);
    let calculatedAmount = rayDiv(value, index);

    userReserve.scaledZTokenBalance = userReserve.scaledZTokenBalance.plus(calculatedAmount);
    userReserve.currentZTokenBalance = rayMul(userReserve.scaledZTokenBalance, index);

    userReserve.liquidityRate = poolReserve.liquidityRate;
    userReserve.variableBorrowIndex = poolReserve.variableBorrowIndex;
    userReserve.lastUpdateTimestamp = event.block.timestamp.toI32();

    userReserve.save();

    // TODO: review
    poolReserve.totalDeposits = poolReserve.totalDeposits.plus(value);
    // poolReserve.availableLiquidity = poolReserve.totalDeposits
    //   .minus(poolReserve.totalPrincipalStableDebt)
    //   .minus(poolReserve.totalScaledVariableDebt);

    poolReserve.availableLiquidity = poolReserve.availableLiquidity.plus(value);
    poolReserve.totalLiquidity = poolReserve.totalLiquidity.plus(value);
    poolReserve.lifetimeLiquidity = poolReserve.lifetimeLiquidity.plus(value);

    if (userReserve.usageAsCollateralEnabledOnUser) {
      poolReserve.totalLiquidityAsCollateral = poolReserve.totalLiquidityAsCollateral.plus(value);
    }
    saveReserve(poolReserve, event);
    saveUserReserveZHistory(userReserve, event, index);
  } else {
    poolReserve.lifetimeReserveFactorAccrued = poolReserve.lifetimeReserveFactorAccrued.plus(value);
    saveReserve(poolReserve, event);
    // log.error('Minting to treasuey {} an amount of: {}', [from.toHexString(), value.toString()]);
  }
}




export function handleBurn(event: ZTokenBurn): void {
  tokenBurn(event, event.params.from, event.params.value, event.params.index);
}

export function handleMint(event: ZTokenMint): void {
  tokenMint(event, event.params.from, event.params.value, event.params.index);
}

export function handleBalanceTransfer(event: ZTokenTransfer): void {
  tokenBurn(event, event.params.from, event.params.value, event.params.index);
  tokenMint(event, event.params.to, event.params.value, event.params.index);

  // TODO: is this really necessary(from v1)? if we transfer zToken we are not moving the collateral (underlying token)
  let zToken = getOrInitZToken(event.address);
  let userFromReserve = getOrInitUserReserve(
    event.params.from,
    zToken.underlyingAssetAddress,
    event
  );
  let userToReserve = getOrInitUserReserve(event.params.to, zToken.underlyingAssetAddress, event);

  let reserve = getOrInitReserve(zToken.underlyingAssetAddress, event);
  if (
    userFromReserve.usageAsCollateralEnabledOnUser &&
    !userToReserve.usageAsCollateralEnabledOnUser
  ) {
    reserve.totalLiquidityAsCollateral = reserve.totalLiquidityAsCollateral.minus(
      event.params.value
    );
    saveReserve(reserve, event);
  } else if (
    !userFromReserve.usageAsCollateralEnabledOnUser &&
    userToReserve.usageAsCollateralEnabledOnUser
  ) {
    reserve.totalLiquidityAsCollateral = reserve.totalLiquidityAsCollateral.plus(
      event.params.value
    );
    saveReserve(reserve, event);
  }
}