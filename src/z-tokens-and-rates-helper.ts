import {
  OwnershipTransferred as OwnershipTransferredEvent,
  deployedContracts as deployedContractsEvent
} from "../generated/ZTokensAndRatesHelper/ZTokensAndRatesHelper"
import { OwnershipTransferred, deployedContracts } from "../generated/schema"

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handledeployedContracts(event: deployedContractsEvent): void {
  let entity = new deployedContracts(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.zToken = event.params.zToken
  entity.strategy = event.params.strategy

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
