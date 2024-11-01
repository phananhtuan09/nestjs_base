import { DataSource } from 'typeorm';
import { typeOrmConfig } from './typeorm.config';
import { DataSourceOptions } from 'typeorm';
const typeOrmDataSource = new DataSource({
  ...(typeOrmConfig as DataSourceOptions),
});

export default typeOrmDataSource;
