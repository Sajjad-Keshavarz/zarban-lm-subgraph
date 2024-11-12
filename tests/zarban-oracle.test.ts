import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { AssetSourceUpdated } from "../generated/schema"
import { AssetSourceUpdated as AssetSourceUpdatedEvent } from "../generated/ZarbanOracle/ZarbanOracle"
import { handleAssetSourceUpdated } from "../src/zarban-oracle"
import { createAssetSourceUpdatedEvent } from "./zarban-oracle-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let asset = Address.fromString("0x0000000000000000000000000000000000000001")
    let source = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let newAssetSourceUpdatedEvent = createAssetSourceUpdatedEvent(
      asset,
      source
    )
    handleAssetSourceUpdated(newAssetSourceUpdatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("AssetSourceUpdated created and stored", () => {
    assert.entityCount("AssetSourceUpdated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "AssetSourceUpdated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "asset",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "AssetSourceUpdated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "source",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
