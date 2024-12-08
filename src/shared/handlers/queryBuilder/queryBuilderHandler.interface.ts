import { SelectQueryBuilder } from 'typeorm';

export interface QueryBuilderHandler<T> {
  handle(
    queryBuilder: SelectQueryBuilder<T>,
    conditionTree: ConditionTree,
  ): SelectQueryBuilder<T>;
}

export enum WhereType {
  WHERE = 'where',
  AND_WHERE = 'andWhere',
  OR_WHERE = 'orWhere',
}

export enum LogicalOperator {
  AND = 'AND',
  OR = 'OR',
}

export interface QueryCondition {
  field: string; // name of field in database
  name: string; // name for query must be unique
  value: unknown;
  operator: '=' | '!=' | '<' | '<=' | '>' | '>=' | 'LIKE';
  typeWhere?: WhereType.OR_WHERE | WhereType.AND_WHERE;
}

export interface ConditionTree {
  [LogicalOperator.AND]?: Array<QueryCondition | ConditionTree>;
  [LogicalOperator.OR]?: Array<QueryCondition | ConditionTree>;
}
