import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  AssetSourceUpdated,
  BaseCurrencySet,
  FallbackOracleUpdated,
  OwnershipTransferred
} from "../generated/ZarbanOracle/ZarbanOracle"

export function createAssetSourceUpdatedEvent(
  asset: Address,
  source: Address
): AssetSourceUpdated {
  let assetSourceUpdatedEvent = changetype<AssetSourceUpdated>(newMockEvent())

  assetSourceUpdatedEvent.parameters = new Array()

  assetSourceUpdatedEvent.parameters.push(
    new ethereum.EventParam("asset", ethereum.Value.fromAddress(asset))
  )
  assetSourceUpdatedEvent.parameters.push(
    new ethereum.EventParam("source", ethereum.Value.fromAddress(source))
  )

  return assetSourceUpdatedEvent
}

export function createBaseCurrencySetEvent(
  baseCurrency: Address,
  baseCurrencyUnit: BigInt
): BaseCurrencySet {
  let baseCurrencySetEvent = changetype<BaseCurrencySet>(newMockEvent())

  baseCurrencySetEvent.parameters = new Array()

  baseCurrencySetEvent.parameters.push(
    new ethereum.EventParam(
      "baseCurrency",
      ethereum.Value.fromAddress(baseCurrency)
    )
  )
  baseCurrencySetEvent.parameters.push(
    new ethereum.EventParam(
      "baseCurrencyUnit",
      ethereum.Value.fromUnsignedBigInt(baseCurrencyUnit)
    )
  )

  return baseCurrencySetEvent
}

export function createFallbackOracleUpdatedEvent(
  fallbackOracle: Address
): FallbackOracleUpdated {
  let fallbackOracleUpdatedEvent = changetype<FallbackOracleUpdated>(
    newMockEvent()
  )

  fallbackOracleUpdatedEvent.parameters = new Array()

  fallbackOracleUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "fallbackOracle",
      ethereum.Value.fromAddress(fallbackOracle)
    )
  )

  return fallbackOracleUpdatedEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}
