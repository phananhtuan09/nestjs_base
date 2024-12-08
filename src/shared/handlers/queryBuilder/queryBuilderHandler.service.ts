import { Injectable } from '@nestjs/common';
import { SelectQueryBuilder, Brackets } from 'typeorm';
import {
  QueryBuilderHandler,
  QueryCondition,
  ConditionTree,
  WhereType,
  LogicalOperator,
} from './queryBuilderHandler.interface';
import { isObject } from '~/common/utils/helper.util';

@Injectable()
export class QueryBuilderHandlerService<T> implements QueryBuilderHandler<T> {
  public handle<T>(
    queryBuilder: SelectQueryBuilder<T>,
    conditionTree: ConditionTree,
  ): SelectQueryBuilder<T> {
    if (!isObject(conditionTree)) {
      return queryBuilder;
    }

    return this.traverseConditions(
      queryBuilder,
      conditionTree,
      WhereType.WHERE,
    );
  }

  private traverseConditions<T>(
    queryBuilder: SelectQueryBuilder<T>,
    conditions: ConditionTree,
    whereType: WhereType,
  ): SelectQueryBuilder<T> {
    for (const key in conditions) {
      if (!Array.isArray(conditions[key]) || conditions[key].length === 0) {
        continue;
      }
      if (key === LogicalOperator.AND) {
        queryBuilder = queryBuilder.andWhere(
          this.createBracket(
            conditions[key] as Array<QueryCondition | ConditionTree>,
            WhereType.AND_WHERE,
          ),
        );
      } else if (key === LogicalOperator.OR) {
        queryBuilder = queryBuilder.orWhere(
          this.createBracket(
            conditions[key] as Array<QueryCondition | ConditionTree>,
            WhereType.OR_WHERE,
          ),
        );
      } else {
        queryBuilder = this.applyCondition(
          queryBuilder,
          conditions[key] as unknown as QueryCondition,
          whereType,
        );
      }
    }
    return queryBuilder;
  }

  private createBracket<T>(
    conditions: Array<QueryCondition | ConditionTree>,
    whereType: WhereType,
  ): Brackets {
    if (!Array.isArray(conditions)) {
      return;
    }
    return new Brackets((qb) => {
      conditions.forEach((condition) => {
        if (
          LogicalOperator.AND in condition ||
          LogicalOperator.OR in condition
        ) {
          this.traverseConditions(
            qb as SelectQueryBuilder<T>,
            condition as ConditionTree,
            WhereType.WHERE,
          );
        } else {
          const singleCondition = condition as QueryCondition;
          this.applyCondition(
            qb as SelectQueryBuilder<T>,
            singleCondition,
            singleCondition.typeWhere ?? whereType,
          );
        }
      });
    });
  }

  private applyCondition<T>(
    queryBuilder: SelectQueryBuilder<T>,
    condition: QueryCondition,
    whereType: WhereType,
  ): SelectQueryBuilder<T> {
    const query = `${condition.field} ${condition.operator} :${condition.field}`;
    queryBuilder[whereType](query, { [condition.field]: condition.value });
    return queryBuilder;
  }
}
