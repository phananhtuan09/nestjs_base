import { DataSource } from 'typeorm';
import { typeOrmConfig } from '../../../configs/typeorm.config';
import { DataSourceOptions } from 'typeorm';
const dataSource = new DataSource({
  ...(typeOrmConfig as DataSourceOptions),
});

export default dataSource;
