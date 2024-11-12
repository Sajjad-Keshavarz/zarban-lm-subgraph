/* eslint-disable @typescript-eslint/no-inferrable-types */
import { ReserveInitialized } from '../generated/templates/LendingPoolConfigurator/LendingPoolConfigurator';
import { IERC20Detailed } from '../generated/templates/LendingPoolConfigurator/IERC20Detailed';
import { IERC20DetailedBytes } from '../generated/templates/LendingPoolConfigurator/IERC20DetailedBytes';
import {
  ZToken as ZTokenContract,
  StableDebtToken as STokenContract,
  VariableDebtToken as VTokenContract,
} from '../generated/templates';
import {
  createMapContractToPool,
  getOrInitZToken,
  getOrInitSToken,
  getOrInitVToken,
  getOrInitReserve,
} from './helpers/initializers';
export {
  handleReserveInterestRateStrategyChanged,
  handleBorrowingDisabledOnReserve,
  handleBorrowingEnabledOnReserve,
  handleStableRateDisabledOnReserve,
  handleStableRateEnabledOnReserve,
  handleReserveActivated,
  handleReserveDeactivated,
  handleReserveFreezed,
  handleReserveUnfreezed,
  handleVariableDebtTokenUpgraded,
  handleStableDebtTokenUpgraded,
  handleZTokenUpgraded,
  handleReserveDecimalsChanged,
  handleReserveFactorChanged,
  handleCollateralConfigurationChanged,
} from './base-lending-pool-configurator';
import { saveReserve, updateInterestRateStrategy } from './base-lending-pool-configurator';

export function handleReserveInitialized(event: ReserveInitialized): void {
  let underlyingAssetAddress = event.params.asset; //_reserve;
  let reserve = getOrInitReserve(underlyingAssetAddress, event);

  let ERC20ZTokenContract = IERC20Detailed.bind(event.params.zToken);
  let ERC20ReserveContract = IERC20Detailed.bind(underlyingAssetAddress);
  let ERC20DetailedBytesContract = IERC20DetailedBytes.bind(underlyingAssetAddress);

  let nameStringCall = ERC20ReserveContract.try_name();
  if (nameStringCall.reverted) {
    let bytesNameCall = ERC20DetailedBytesContract.try_name();
    if (bytesNameCall.reverted) {
      reserve.name = '';
    } else {
      reserve.name = bytesNameCall.value.toString();
    }
  } else {
    reserve.name = nameStringCall.value;
  }

  reserve.symbol = ERC20ZTokenContract.symbol().slice(1);

  reserve.decimals = ERC20ReserveContract.decimals();

  updateInterestRateStrategy(reserve, event.params.interestRateStrategyAddress, true);

  ZTokenContract.create(event.params.zToken);
  createMapContractToPool(event.params.zToken, reserve.pool);
  let zToken = getOrInitZToken(event.params.zToken);
  zToken.underlyingAssetAddress = reserve.underlyingAsset;
  zToken.underlyingAssetDecimals = reserve.decimals;
  zToken.pool = reserve.pool;
  zToken.save();

  STokenContract.create(event.params.stableDebtToken);
  createMapContractToPool(event.params.stableDebtToken, reserve.pool);
  let sToken = getOrInitSToken(event.params.stableDebtToken);
  sToken.underlyingAssetAddress = reserve.underlyingAsset;
  sToken.underlyingAssetDecimals = reserve.decimals;
  sToken.pool = reserve.pool;
  sToken.save();

  VTokenContract.create(event.params.variableDebtToken);
  createMapContractToPool(event.params.variableDebtToken, reserve.pool);
  let vToken = getOrInitVToken(event.params.variableDebtToken);
  vToken.underlyingAssetAddress = reserve.underlyingAsset;
  vToken.underlyingAssetDecimals = reserve.decimals;
  vToken.pool = reserve.pool;
  vToken.save();

  reserve.zToken = zToken.id;
  reserve.sToken = sToken.id;
  reserve.vToken = vToken.id;
  reserve.isActive = true;
  saveReserve(reserve, event);
}
