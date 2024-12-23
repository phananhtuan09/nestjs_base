import {
  CommonResponse,
  StatusResponse,
  PaginationResponse,
} from '../types/response/common.type';

export const DEFAULT_RESPONSE: CommonResponse<null> = {
  status: StatusResponse.error,
  message: 'An unexpected error occurred',
  data: null,
  code: null,
};

export const DEFAULT_RESPONSE_PAGINATION: PaginationResponse = {
  page: 1,
  pageSize: 0,
  totalPages: 1,
  totalItems: 0,
};

export enum TypeOrmErrorCodes {
  CannotReflectMethodParameterTypeError = 'CannotReflectMethodParameterTypeError',
  AlreadyHasActiveConnectionError = 'AlreadyHasActiveConnectionError',
  SubjectWithoutIdentifierError = 'SubjectWithoutIdentifierError',
  CannotConnectAlreadyConnectedError = 'CannotConnectAlreadyConnectedError',
  LockNotSupportedOnGivenDriverError = 'LockNotSupportedOnGivenDriverError',
  ConnectionIsNotSetError = 'ConnectionIsNotSetError',
  CannotCreateEntityIdMapError = 'CannotCreateEntityIdMapError',
  MetadataAlreadyExistsError = 'MetadataAlreadyExistsError',
  CannotDetermineEntityError = 'CannotDetermineEntityError',
  UpdateValuesMissingError = 'UpdateValuesMissingError',
  TreeRepositoryNotSupportedError = 'TreeRepositoryNotSupportedError',
  CustomRepositoryNotFoundError = 'CustomRepositoryNotFoundError',
  TransactionNotStartedError = 'TransactionNotStartedError',
  TransactionAlreadyStartedError = 'TransactionAlreadyStartedError',
  EntityNotFoundError = 'EntityNotFoundError',
  EntityMetadataNotFoundError = 'EntityMetadataNotFoundError',
  MustBeEntityError = 'MustBeEntityError',
  OptimisticLockVersionMismatchError = 'OptimisticLockVersionMismatchError',
  LimitOnUpdateNotSupportedError = 'LimitOnUpdateNotSupportedError',
  PrimaryColumnCannotBeNullableError = 'PrimaryColumnCannotBeNullableError',
  CustomRepositoryCannotInheritRepositoryError = 'CustomRepositoryCannotInheritRepositoryError',
  QueryRunnerProviderAlreadyReleasedError = 'QueryRunnerProviderAlreadyReleasedError',
  CannotAttachTreeChildrenEntityError = 'CannotAttachTreeChildrenEntityError',
  CustomRepositoryDoesNotHaveEntityError = 'CustomRepositoryDoesNotHaveEntityError',
  MissingDeleteDateColumnError = 'MissingDeleteDateColumnError',
  NoConnectionForRepositoryError = 'NoConnectionForRepositoryError',
  CircularRelationsError = 'CircularRelationsError',
  ReturningStatementNotSupportedError = 'ReturningStatementNotSupportedError',
  UsingJoinTableIsNotAllowedError = 'UsingJoinTableIsNotAllowedError',
  MissingJoinColumnError = 'MissingJoinColumnError',
  MissingPrimaryColumnError = 'MissingPrimaryColumnError',
  EntityPropertyNotFoundError = 'EntityPropertyNotFoundError',
  MissingDriverError = 'MissingDriverError',
  DriverPackageNotInstalledError = 'DriverPackageNotInstalledError',
  CannotGetEntityManagerNotConnectedError = 'CannotGetEntityManagerNotConnectedError',
  ConnectionNotFoundError = 'ConnectionNotFoundError',
  NoVersionOrUpdateDateColumnError = 'NoVersionOrUpdateDateColumnError',
  InsertValuesMissingError = 'InsertValuesMissingError',
  OptimisticLockCanNotBeUsedError = 'OptimisticLockCanNotBeUsedError',
  MetadataWithSuchNameAlreadyExistsError = 'MetadataWithSuchNameAlreadyExistsError',
  DriverOptionNotSetError = 'DriverOptionNotSetError',
  FindRelationsNotFoundError = 'FindRelationsNotFoundError',
  NamingStrategyNotFoundError = 'NamingStrategyNotFoundError',
  PessimisticLockTransactionRequiredError = 'PessimisticLockTransactionRequiredError',
  RepositoryNotTreeError = 'RepositoryNotTreeError',
  DataTypeNotSupportedError = 'DataTypeNotSupportedError',
  InitializedRelationError = 'InitializedRelationError',
  MissingJoinTableError = 'MissingJoinTableError',
  QueryFailedError = 'QueryFailedError',
  NoNeedToReleaseEntityManagerError = 'NoNeedToReleaseEntityManagerError',
  UsingJoinColumnOnlyOnOneSideAllowedError = 'UsingJoinColumnOnlyOnOneSideAllowedError',
  UsingJoinTableOnlyOnOneSideAllowedError = 'UsingJoinTableOnlyOnOneSideAllowedError',
  SubjectRemovedAndUpdatedError = 'SubjectRemovedAndUpdatedError',
  PersistedEntityNotFoundError = 'PersistedEntityNotFoundError',
  UsingJoinColumnIsNotAllowedError = 'UsingJoinColumnIsNotAllowedError',
  ColumnTypeUndefinedError = 'ColumnTypeUndefinedError',
  QueryRunnerAlreadyReleasedError = 'QueryRunnerAlreadyReleasedError',
  OffsetWithoutLimitNotSupportedError = 'OffsetWithoutLimitNotSupportedError',
  CannotExecuteNotConnectedError = 'CannotExecuteNotConnectedError',
  NoConnectionOptionError = 'NoConnectionOptionError',
  TypeORMError = 'TypeORMError',
  ForbiddenTransactionModeOverrideError = 'ForbiddenTransactionModeOverrideError',
}

export const BASE_TYPE_NAMES = [
  'String',
  'Number',
  'Boolean',
  'Array',
  'Object',
];
