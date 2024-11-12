import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  Approval,
  BalanceTransfer,
  Burn,
  Initialized,
  Mint,
  Transfer
} from "../generated/ZToken/ZToken"

export function createApprovalEvent(
  owner: Address,
  spender: Address,
  value: BigInt
): Approval {
  let approvalEvent = changetype<Approval>(newMockEvent())

  approvalEvent.parameters = new Array()

  approvalEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("spender", ethereum.Value.fromAddress(spender))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )

  return approvalEvent
}

export function createBalanceTransferEvent(
  from: Address,
  to: Address,
  value: BigInt,
  index: BigInt
): BalanceTransfer {
  let balanceTransferEvent = changetype<BalanceTransfer>(newMockEvent())

  balanceTransferEvent.parameters = new Array()

  balanceTransferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  balanceTransferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  balanceTransferEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )
  balanceTransferEvent.parameters.push(
    new ethereum.EventParam("index", ethereum.Value.fromUnsignedBigInt(index))
  )

  return balanceTransferEvent
}

export function createBurnEvent(
  from: Address,
  target: Address,
  value: BigInt,
  index: BigInt
): Burn {
  let burnEvent = changetype<Burn>(newMockEvent())

  burnEvent.parameters = new Array()

  burnEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  burnEvent.parameters.push(
    new ethereum.EventParam("target", ethereum.Value.fromAddress(target))
  )
  burnEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )
  burnEvent.parameters.push(
    new ethereum.EventParam("index", ethereum.Value.fromUnsignedBigInt(index))
  )

  return burnEvent
}

export function createInitializedEvent(
  underlyingAsset: Address,
  pool: Address,
  treasury: Address,
  incentivesController: Address,
  zTokenDecimals: i32,
  zTokenName: string,
  zTokenSymbol: string,
  params: Bytes
): Initialized {
  let initializedEvent = changetype<Initialized>(newMockEvent())

  initializedEvent.parameters = new Array()

  initializedEvent.parameters.push(
    new ethereum.EventParam(
      "underlyingAsset",
      ethereum.Value.fromAddress(underlyingAsset)
    )
  )
  initializedEvent.parameters.push(
    new ethereum.EventParam("pool", ethereum.Value.fromAddress(pool))
  )
  initializedEvent.parameters.push(
    new ethereum.EventParam("treasury", ethereum.Value.fromAddress(treasury))
  )
  initializedEvent.parameters.push(
    new ethereum.EventParam(
      "incentivesController",
      ethereum.Value.fromAddress(incentivesController)
    )
  )
  initializedEvent.parameters.push(
    new ethereum.EventParam(
      "zTokenDecimals",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(zTokenDecimals))
    )
  )
  initializedEvent.parameters.push(
    new ethereum.EventParam("zTokenName", ethereum.Value.fromString(zTokenName))
  )
  initializedEvent.parameters.push(
    new ethereum.EventParam(
      "zTokenSymbol",
      ethereum.Value.fromString(zTokenSymbol)
    )
  )
  initializedEvent.parameters.push(
    new ethereum.EventParam("params", ethereum.Value.fromBytes(params))
  )

  return initializedEvent
}

export function createMintEvent(
  from: Address,
  value: BigInt,
  index: BigInt
): Mint {
  let mintEvent = changetype<Mint>(newMockEvent())

  mintEvent.parameters = new Array()

  mintEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  mintEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )
  mintEvent.parameters.push(
    new ethereum.EventParam("index", ethereum.Value.fromUnsignedBigInt(index))
  )

  return mintEvent
}

export function createTransferEvent(
  from: Address,
  to: Address,
  value: BigInt
): Transfer {
  let transferEvent = changetype<Transfer>(newMockEvent())

  transferEvent.parameters = new Array()

  transferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )

  return transferEvent
}
