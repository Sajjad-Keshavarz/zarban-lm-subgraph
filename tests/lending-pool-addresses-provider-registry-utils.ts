import { newMockEvent } from "matchstick-as"
import { ethereum, Address } from "@graphprotocol/graph-ts"
import {
  AddressesProviderRegistered,
  AddressesProviderUnregistered,
  OwnershipTransferred
} from "../generated/LendingPoolAddressesProviderRegistry/LendingPoolAddressesProviderRegistry"

export function createAddressesProviderRegisteredEvent(
  newAddress: Address
): AddressesProviderRegistered {
  let addressesProviderRegisteredEvent =
    changetype<AddressesProviderRegistered>(newMockEvent())

  addressesProviderRegisteredEvent.parameters = new Array()

  addressesProviderRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "newAddress",
      ethereum.Value.fromAddress(newAddress)
    )
  )

  return addressesProviderRegisteredEvent
}

export function createAddressesProviderUnregisteredEvent(
  newAddress: Address
): AddressesProviderUnregistered {
  let addressesProviderUnregisteredEvent =
    changetype<AddressesProviderUnregistered>(newMockEvent())

  addressesProviderUnregisteredEvent.parameters = new Array()

  addressesProviderUnregisteredEvent.parameters.push(
    new ethereum.EventParam(
      "newAddress",
      ethereum.Value.fromAddress(newAddress)
    )
  )

  return addressesProviderUnregisteredEvent
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
