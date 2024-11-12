import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address } from "@graphprotocol/graph-ts"
import { AddressesProviderRegistered } from "../generated/schema"
import { AddressesProviderRegistered as AddressesProviderRegisteredEvent } from "../generated/LendingPoolAddressesProviderRegistry/LendingPoolAddressesProviderRegistry"
import { handleAddressesProviderRegistered } from "../src/lending-pool-addresses-provider-registry"
import { createAddressesProviderRegisteredEvent } from "./lending-pool-addresses-provider-registry-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let newAddress = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let newAddressesProviderRegisteredEvent =
      createAddressesProviderRegisteredEvent(newAddress)
    handleAddressesProviderRegistered(newAddressesProviderRegisteredEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("AddressesProviderRegistered created and stored", () => {
    assert.entityCount("AddressesProviderRegistered", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "AddressesProviderRegistered",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "newAddress",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
