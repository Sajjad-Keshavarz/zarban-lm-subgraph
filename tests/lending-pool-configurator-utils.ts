import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  BorrowingDisabledOnReserve,
  BorrowingEnabledOnReserve,
  CollateralConfigurationChanged,
  ReserveActivated,
  ReserveDeactivated,
  ReserveDecimalsChanged,
  ReserveFactorChanged,
  ReserveFrozen,
  ReserveInitialized,
  ReserveInterestRateStrategyChanged,
  ReserveUnfrozen,
  StableDebtTokenUpgraded,
  StableRateDisabledOnReserve,
  StableRateEnabledOnReserve,
  VariableDebtTokenUpgraded,
  ZTokenUpgraded
} from "../generated/LendingPoolConfigurator/LendingPoolConfigurator"

export function createBorrowingDisabledOnReserveEvent(
  asset: Address
): BorrowingDisabledOnReserve {
  let borrowingDisabledOnReserveEvent = changetype<BorrowingDisabledOnReserve>(
    newMockEvent()
  )

  borrowingDisabledOnReserveEvent.parameters = new Array()

  borrowingDisabledOnReserveEvent.parameters.push(
    new ethereum.EventParam("asset", ethereum.Value.fromAddress(asset))
  )

  return borrowingDisabledOnReserveEvent
}

export function createBorrowingEnabledOnReserveEvent(
  asset: Address,
  stableRateEnabled: boolean
): BorrowingEnabledOnReserve {
  let borrowingEnabledOnReserveEvent = changetype<BorrowingEnabledOnReserve>(
    newMockEvent()
  )

  borrowingEnabledOnReserveEvent.parameters = new Array()

  borrowingEnabledOnReserveEvent.parameters.push(
    new ethereum.EventParam("asset", ethereum.Value.fromAddress(asset))
  )
  borrowingEnabledOnReserveEvent.parameters.push(
    new ethereum.EventParam(
      "stableRateEnabled",
      ethereum.Value.fromBoolean(stableRateEnabled)
    )
  )

  return borrowingEnabledOnReserveEvent
}

export function createCollateralConfigurationChangedEvent(
  asset: Address,
  ltv: BigInt,
  liquidationThreshold: BigInt,
  liquidationBonus: BigInt
): CollateralConfigurationChanged {
  let collateralConfigurationChangedEvent =
    changetype<CollateralConfigurationChanged>(newMockEvent())

  collateralConfigurationChangedEvent.parameters = new Array()

  collateralConfigurationChangedEvent.parameters.push(
    new ethereum.EventParam("asset", ethereum.Value.fromAddress(asset))
  )
  collateralConfigurationChangedEvent.parameters.push(
    new ethereum.EventParam("ltv", ethereum.Value.fromUnsignedBigInt(ltv))
  )
  collateralConfigurationChangedEvent.parameters.push(
    new ethereum.EventParam(
      "liquidationThreshold",
      ethereum.Value.fromUnsignedBigInt(liquidationThreshold)
    )
  )
  collateralConfigurationChangedEvent.parameters.push(
    new ethereum.EventParam(
      "liquidationBonus",
      ethereum.Value.fromUnsignedBigInt(liquidationBonus)
    )
  )

  return collateralConfigurationChangedEvent
}

export function createReserveActivatedEvent(asset: Address): ReserveActivated {
  let reserveActivatedEvent = changetype<ReserveActivated>(newMockEvent())

  reserveActivatedEvent.parameters = new Array()

  reserveActivatedEvent.parameters.push(
    new ethereum.EventParam("asset", ethereum.Value.fromAddress(asset))
  )

  return reserveActivatedEvent
}

export function createReserveDeactivatedEvent(
  asset: Address
): ReserveDeactivated {
  let reserveDeactivatedEvent = changetype<ReserveDeactivated>(newMockEvent())

  reserveDeactivatedEvent.parameters = new Array()

  reserveDeactivatedEvent.parameters.push(
    new ethereum.EventParam("asset", ethereum.Value.fromAddress(asset))
  )

  return reserveDeactivatedEvent
}

export function createReserveDecimalsChangedEvent(
  asset: Address,
  decimals: BigInt
): ReserveDecimalsChanged {
  let reserveDecimalsChangedEvent = changetype<ReserveDecimalsChanged>(
    newMockEvent()
  )

  reserveDecimalsChangedEvent.parameters = new Array()

  reserveDecimalsChangedEvent.parameters.push(
    new ethereum.EventParam("asset", ethereum.Value.fromAddress(asset))
  )
  reserveDecimalsChangedEvent.parameters.push(
    new ethereum.EventParam(
      "decimals",
      ethereum.Value.fromUnsignedBigInt(decimals)
    )
  )

  return reserveDecimalsChangedEvent
}

export function createReserveFactorChangedEvent(
  asset: Address,
  factor: BigInt
): ReserveFactorChanged {
  let reserveFactorChangedEvent = changetype<ReserveFactorChanged>(
    newMockEvent()
  )

  reserveFactorChangedEvent.parameters = new Array()

  reserveFactorChangedEvent.parameters.push(
    new ethereum.EventParam("asset", ethereum.Value.fromAddress(asset))
  )
  reserveFactorChangedEvent.parameters.push(
    new ethereum.EventParam("factor", ethereum.Value.fromUnsignedBigInt(factor))
  )

  return reserveFactorChangedEvent
}

export function createReserveFrozenEvent(asset: Address): ReserveFrozen {
  let reserveFrozenEvent = changetype<ReserveFrozen>(newMockEvent())

  reserveFrozenEvent.parameters = new Array()

  reserveFrozenEvent.parameters.push(
    new ethereum.EventParam("asset", ethereum.Value.fromAddress(asset))
  )

  return reserveFrozenEvent
}

export function createReserveInitializedEvent(
  asset: Address,
  zToken: Address,
  stableDebtToken: Address,
  variableDebtToken: Address,
  interestRateStrategyAddress: Address
): ReserveInitialized {
  let reserveInitializedEvent = changetype<ReserveInitialized>(newMockEvent())

  reserveInitializedEvent.parameters = new Array()

  reserveInitializedEvent.parameters.push(
    new ethereum.EventParam("asset", ethereum.Value.fromAddress(asset))
  )
  reserveInitializedEvent.parameters.push(
    new ethereum.EventParam("zToken", ethereum.Value.fromAddress(zToken))
  )
  reserveInitializedEvent.parameters.push(
    new ethereum.EventParam(
      "stableDebtToken",
      ethereum.Value.fromAddress(stableDebtToken)
    )
  )
  reserveInitializedEvent.parameters.push(
    new ethereum.EventParam(
      "variableDebtToken",
      ethereum.Value.fromAddress(variableDebtToken)
    )
  )
  reserveInitializedEvent.parameters.push(
    new ethereum.EventParam(
      "interestRateStrategyAddress",
      ethereum.Value.fromAddress(interestRateStrategyAddress)
    )
  )

  return reserveInitializedEvent
}

export function createReserveInterestRateStrategyChangedEvent(
  asset: Address,
  strategy: Address
): ReserveInterestRateStrategyChanged {
  let reserveInterestRateStrategyChangedEvent =
    changetype<ReserveInterestRateStrategyChanged>(newMockEvent())

  reserveInterestRateStrategyChangedEvent.parameters = new Array()

  reserveInterestRateStrategyChangedEvent.parameters.push(
    new ethereum.EventParam("asset", ethereum.Value.fromAddress(asset))
  )
  reserveInterestRateStrategyChangedEvent.parameters.push(
    new ethereum.EventParam("strategy", ethereum.Value.fromAddress(strategy))
  )

  return reserveInterestRateStrategyChangedEvent
}

export function createReserveUnfrozenEvent(asset: Address): ReserveUnfrozen {
  let reserveUnfrozenEvent = changetype<ReserveUnfrozen>(newMockEvent())

  reserveUnfrozenEvent.parameters = new Array()

  reserveUnfrozenEvent.parameters.push(
    new ethereum.EventParam("asset", ethereum.Value.fromAddress(asset))
  )

  return reserveUnfrozenEvent
}

export function createStableDebtTokenUpgradedEvent(
  asset: Address,
  proxy: Address,
  implementation: Address
): StableDebtTokenUpgraded {
  let stableDebtTokenUpgradedEvent = changetype<StableDebtTokenUpgraded>(
    newMockEvent()
  )

  stableDebtTokenUpgradedEvent.parameters = new Array()

  stableDebtTokenUpgradedEvent.parameters.push(
    new ethereum.EventParam("asset", ethereum.Value.fromAddress(asset))
  )
  stableDebtTokenUpgradedEvent.parameters.push(
    new ethereum.EventParam("proxy", ethereum.Value.fromAddress(proxy))
  )
  stableDebtTokenUpgradedEvent.parameters.push(
    new ethereum.EventParam(
      "implementation",
      ethereum.Value.fromAddress(implementation)
    )
  )

  return stableDebtTokenUpgradedEvent
}

export function createStableRateDisabledOnReserveEvent(
  asset: Address
): StableRateDisabledOnReserve {
  let stableRateDisabledOnReserveEvent =
    changetype<StableRateDisabledOnReserve>(newMockEvent())

  stableRateDisabledOnReserveEvent.parameters = new Array()

  stableRateDisabledOnReserveEvent.parameters.push(
    new ethereum.EventParam("asset", ethereum.Value.fromAddress(asset))
  )

  return stableRateDisabledOnReserveEvent
}

export function createStableRateEnabledOnReserveEvent(
  asset: Address
): StableRateEnabledOnReserve {
  let stableRateEnabledOnReserveEvent = changetype<StableRateEnabledOnReserve>(
    newMockEvent()
  )

  stableRateEnabledOnReserveEvent.parameters = new Array()

  stableRateEnabledOnReserveEvent.parameters.push(
    new ethereum.EventParam("asset", ethereum.Value.fromAddress(asset))
  )

  return stableRateEnabledOnReserveEvent
}

export function createVariableDebtTokenUpgradedEvent(
  asset: Address,
  proxy: Address,
  implementation: Address
): VariableDebtTokenUpgraded {
  let variableDebtTokenUpgradedEvent = changetype<VariableDebtTokenUpgraded>(
    newMockEvent()
  )

  variableDebtTokenUpgradedEvent.parameters = new Array()

  variableDebtTokenUpgradedEvent.parameters.push(
    new ethereum.EventParam("asset", ethereum.Value.fromAddress(asset))
  )
  variableDebtTokenUpgradedEvent.parameters.push(
    new ethereum.EventParam("proxy", ethereum.Value.fromAddress(proxy))
  )
  variableDebtTokenUpgradedEvent.parameters.push(
    new ethereum.EventParam(
      "implementation",
      ethereum.Value.fromAddress(implementation)
    )
  )

  return variableDebtTokenUpgradedEvent
}

export function createZTokenUpgradedEvent(
  asset: Address,
  proxy: Address,
  implementation: Address
): ZTokenUpgraded {
  let zTokenUpgradedEvent = changetype<ZTokenUpgraded>(newMockEvent())

  zTokenUpgradedEvent.parameters = new Array()

  zTokenUpgradedEvent.parameters.push(
    new ethereum.EventParam("asset", ethereum.Value.fromAddress(asset))
  )
  zTokenUpgradedEvent.parameters.push(
    new ethereum.EventParam("proxy", ethereum.Value.fromAddress(proxy))
  )
  zTokenUpgradedEvent.parameters.push(
    new ethereum.EventParam(
      "implementation",
      ethereum.Value.fromAddress(implementation)
    )
  )

  return zTokenUpgradedEvent
}
