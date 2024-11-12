import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { BorrowingDisabledOnReserve } from "../generated/schema"
import { BorrowingDisabledOnReserve as BorrowingDisabledOnReserveEvent } from "../generated/LendingPoolConfigurator/LendingPoolConfigurator"
import { handleBorrowingDisabledOnReserve } from "../src/lending-pool-configurator"
import { createBorrowingDisabledOnReserveEvent } from "./lending-pool-configurator-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let asset = Address.fromString("0x0000000000000000000000000000000000000001")
    let newBorrowingDisabledOnReserveEvent =
      createBorrowingDisabledOnReserveEvent(asset)
    handleBorrowingDisabledOnReserve(newBorrowingDisabledOnReserveEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("BorrowingDisabledOnReserve created and stored", () => {
    assert.entityCount("BorrowingDisabledOnReserve", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "BorrowingDisabledOnReserve",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "asset",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
