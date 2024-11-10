import { newMockEvent } from "matchstick-as"
import { ethereum, Address } from "@graphprotocol/graph-ts"
import {
  OwnershipTransferred,
  deployedContracts
} from "../generated/ZTokensAndRatesHelper/ZTokensAndRatesHelper"

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

export function createdeployedContractsEvent(
  zToken: Address,
  strategy: Address
): deployedContracts {
  let deployedContractsEvent = changetype<deployedContracts>(newMockEvent())

  deployedContractsEvent.parameters = new Array()

  deployedContractsEvent.parameters.push(
    new ethereum.EventParam("zToken", ethereum.Value.fromAddress(zToken))
  )
  deployedContractsEvent.parameters.push(
    new ethereum.EventParam("strategy", ethereum.Value.fromAddress(strategy))
  )

  return deployedContractsEvent
}
