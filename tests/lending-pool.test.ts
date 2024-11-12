import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { Borrow } from "../generated/schema"
import { Borrow as BorrowEvent } from "../generated/LendingPool/LendingPool"
import { handleBorrow } from "../src/lending-pool"
import { createBorrowEvent } from "./lending-pool-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let reserve = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let user = Address.fromString("0x0000000000000000000000000000000000000001")
    let onBehalfOf = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let amount = BigInt.fromI32(234)
    let borrowRateMode = BigInt.fromI32(234)
    let borrowRate = BigInt.fromI32(234)
    let referral = 123
    let newBorrowEvent = createBorrowEvent(
      reserve,
      user,
      onBehalfOf,
      amount,
      borrowRateMode,
      borrowRate,
      referral
    )
    handleBorrow(newBorrowEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("Borrow created and stored", () => {
    assert.entityCount("Borrow", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "Borrow",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "reserve",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "Borrow",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "user",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "Borrow",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "onBehalfOf",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "Borrow",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "amount",
      "234"
    )
    assert.fieldEquals(
      "Borrow",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "borrowRateMode",
      "234"
    )
    assert.fieldEquals(
      "Borrow",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "borrowRate",
      "234"
    )
    assert.fieldEquals(
      "Borrow",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "referral",
      "123"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
