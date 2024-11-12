import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  Borrow,
  Deposit,
  FlashLoan,
  LiquidationCall,
  Paused,
  RebalanceStableBorrowRate,
  Repay,
  ReserveDataUpdated,
  ReserveUsedAsCollateralDisabled,
  ReserveUsedAsCollateralEnabled,
  Swap,
  Unpaused,
  Withdraw
} from "../generated/LendingPool/LendingPool"

export function createBorrowEvent(
  reserve: Address,
  user: Address,
  onBehalfOf: Address,
  amount: BigInt,
  borrowRateMode: BigInt,
  borrowRate: BigInt,
  referral: i32
): Borrow {
  let borrowEvent = changetype<Borrow>(newMockEvent())

  borrowEvent.parameters = new Array()

  borrowEvent.parameters.push(
    new ethereum.EventParam("reserve", ethereum.Value.fromAddress(reserve))
  )
  borrowEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  borrowEvent.parameters.push(
    new ethereum.EventParam(
      "onBehalfOf",
      ethereum.Value.fromAddress(onBehalfOf)
    )
  )
  borrowEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  borrowEvent.parameters.push(
    new ethereum.EventParam(
      "borrowRateMode",
      ethereum.Value.fromUnsignedBigInt(borrowRateMode)
    )
  )
  borrowEvent.parameters.push(
    new ethereum.EventParam(
      "borrowRate",
      ethereum.Value.fromUnsignedBigInt(borrowRate)
    )
  )
  borrowEvent.parameters.push(
    new ethereum.EventParam(
      "referral",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(referral))
    )
  )

  return borrowEvent
}

export function createDepositEvent(
  reserve: Address,
  user: Address,
  onBehalfOf: Address,
  amount: BigInt,
  referral: i32
): Deposit {
  let depositEvent = changetype<Deposit>(newMockEvent())

  depositEvent.parameters = new Array()

  depositEvent.parameters.push(
    new ethereum.EventParam("reserve", ethereum.Value.fromAddress(reserve))
  )
  depositEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  depositEvent.parameters.push(
    new ethereum.EventParam(
      "onBehalfOf",
      ethereum.Value.fromAddress(onBehalfOf)
    )
  )
  depositEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  depositEvent.parameters.push(
    new ethereum.EventParam(
      "referral",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(referral))
    )
  )

  return depositEvent
}

export function createFlashLoanEvent(
  target: Address,
  initiator: Address,
  asset: Address,
  amount: BigInt,
  premium: BigInt,
  referralCode: i32
): FlashLoan {
  let flashLoanEvent = changetype<FlashLoan>(newMockEvent())

  flashLoanEvent.parameters = new Array()

  flashLoanEvent.parameters.push(
    new ethereum.EventParam("target", ethereum.Value.fromAddress(target))
  )
  flashLoanEvent.parameters.push(
    new ethereum.EventParam("initiator", ethereum.Value.fromAddress(initiator))
  )
  flashLoanEvent.parameters.push(
    new ethereum.EventParam("asset", ethereum.Value.fromAddress(asset))
  )
  flashLoanEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  flashLoanEvent.parameters.push(
    new ethereum.EventParam(
      "premium",
      ethereum.Value.fromUnsignedBigInt(premium)
    )
  )
  flashLoanEvent.parameters.push(
    new ethereum.EventParam(
      "referralCode",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(referralCode))
    )
  )

  return flashLoanEvent
}

export function createLiquidationCallEvent(
  collateralAsset: Address,
  debtAsset: Address,
  user: Address,
  debtToCover: BigInt,
  liquidatedCollateralAmount: BigInt,
  liquidator: Address,
  receiveZToken: boolean
): LiquidationCall {
  let liquidationCallEvent = changetype<LiquidationCall>(newMockEvent())

  liquidationCallEvent.parameters = new Array()

  liquidationCallEvent.parameters.push(
    new ethereum.EventParam(
      "collateralAsset",
      ethereum.Value.fromAddress(collateralAsset)
    )
  )
  liquidationCallEvent.parameters.push(
    new ethereum.EventParam("debtAsset", ethereum.Value.fromAddress(debtAsset))
  )
  liquidationCallEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  liquidationCallEvent.parameters.push(
    new ethereum.EventParam(
      "debtToCover",
      ethereum.Value.fromUnsignedBigInt(debtToCover)
    )
  )
  liquidationCallEvent.parameters.push(
    new ethereum.EventParam(
      "liquidatedCollateralAmount",
      ethereum.Value.fromUnsignedBigInt(liquidatedCollateralAmount)
    )
  )
  liquidationCallEvent.parameters.push(
    new ethereum.EventParam(
      "liquidator",
      ethereum.Value.fromAddress(liquidator)
    )
  )
  liquidationCallEvent.parameters.push(
    new ethereum.EventParam(
      "receiveZToken",
      ethereum.Value.fromBoolean(receiveZToken)
    )
  )

  return liquidationCallEvent
}

export function createPausedEvent(): Paused {
  let pausedEvent = changetype<Paused>(newMockEvent())

  pausedEvent.parameters = new Array()

  return pausedEvent
}

export function createRebalanceStableBorrowRateEvent(
  reserve: Address,
  user: Address
): RebalanceStableBorrowRate {
  let rebalanceStableBorrowRateEvent = changetype<RebalanceStableBorrowRate>(
    newMockEvent()
  )

  rebalanceStableBorrowRateEvent.parameters = new Array()

  rebalanceStableBorrowRateEvent.parameters.push(
    new ethereum.EventParam("reserve", ethereum.Value.fromAddress(reserve))
  )
  rebalanceStableBorrowRateEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )

  return rebalanceStableBorrowRateEvent
}

export function createRepayEvent(
  reserve: Address,
  user: Address,
  repayer: Address,
  amount: BigInt
): Repay {
  let repayEvent = changetype<Repay>(newMockEvent())

  repayEvent.parameters = new Array()

  repayEvent.parameters.push(
    new ethereum.EventParam("reserve", ethereum.Value.fromAddress(reserve))
  )
  repayEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  repayEvent.parameters.push(
    new ethereum.EventParam("repayer", ethereum.Value.fromAddress(repayer))
  )
  repayEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return repayEvent
}

export function createReserveDataUpdatedEvent(
  reserve: Address,
  liquidityRate: BigInt,
  stableBorrowRate: BigInt,
  variableBorrowRate: BigInt,
  liquidityIndex: BigInt,
  variableBorrowIndex: BigInt
): ReserveDataUpdated {
  let reserveDataUpdatedEvent = changetype<ReserveDataUpdated>(newMockEvent())

  reserveDataUpdatedEvent.parameters = new Array()

  reserveDataUpdatedEvent.parameters.push(
    new ethereum.EventParam("reserve", ethereum.Value.fromAddress(reserve))
  )
  reserveDataUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "liquidityRate",
      ethereum.Value.fromUnsignedBigInt(liquidityRate)
    )
  )
  reserveDataUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "stableBorrowRate",
      ethereum.Value.fromUnsignedBigInt(stableBorrowRate)
    )
  )
  reserveDataUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "variableBorrowRate",
      ethereum.Value.fromUnsignedBigInt(variableBorrowRate)
    )
  )
  reserveDataUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "liquidityIndex",
      ethereum.Value.fromUnsignedBigInt(liquidityIndex)
    )
  )
  reserveDataUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "variableBorrowIndex",
      ethereum.Value.fromUnsignedBigInt(variableBorrowIndex)
    )
  )

  return reserveDataUpdatedEvent
}

export function createReserveUsedAsCollateralDisabledEvent(
  reserve: Address,
  user: Address
): ReserveUsedAsCollateralDisabled {
  let reserveUsedAsCollateralDisabledEvent =
    changetype<ReserveUsedAsCollateralDisabled>(newMockEvent())

  reserveUsedAsCollateralDisabledEvent.parameters = new Array()

  reserveUsedAsCollateralDisabledEvent.parameters.push(
    new ethereum.EventParam("reserve", ethereum.Value.fromAddress(reserve))
  )
  reserveUsedAsCollateralDisabledEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )

  return reserveUsedAsCollateralDisabledEvent
}

export function createReserveUsedAsCollateralEnabledEvent(
  reserve: Address,
  user: Address
): ReserveUsedAsCollateralEnabled {
  let reserveUsedAsCollateralEnabledEvent =
    changetype<ReserveUsedAsCollateralEnabled>(newMockEvent())

  reserveUsedAsCollateralEnabledEvent.parameters = new Array()

  reserveUsedAsCollateralEnabledEvent.parameters.push(
    new ethereum.EventParam("reserve", ethereum.Value.fromAddress(reserve))
  )
  reserveUsedAsCollateralEnabledEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )

  return reserveUsedAsCollateralEnabledEvent
}

export function createSwapEvent(
  reserve: Address,
  user: Address,
  rateMode: BigInt
): Swap {
  let swapEvent = changetype<Swap>(newMockEvent())

  swapEvent.parameters = new Array()

  swapEvent.parameters.push(
    new ethereum.EventParam("reserve", ethereum.Value.fromAddress(reserve))
  )
  swapEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  swapEvent.parameters.push(
    new ethereum.EventParam(
      "rateMode",
      ethereum.Value.fromUnsignedBigInt(rateMode)
    )
  )

  return swapEvent
}

export function createUnpausedEvent(): Unpaused {
  let unpausedEvent = changetype<Unpaused>(newMockEvent())

  unpausedEvent.parameters = new Array()

  return unpausedEvent
}

export function createWithdrawEvent(
  reserve: Address,
  user: Address,
  to: Address,
  amount: BigInt
): Withdraw {
  let withdrawEvent = changetype<Withdraw>(newMockEvent())

  withdrawEvent.parameters = new Array()

  withdrawEvent.parameters.push(
    new ethereum.EventParam("reserve", ethereum.Value.fromAddress(reserve))
  )
  withdrawEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  withdrawEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  withdrawEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return withdrawEvent
}
