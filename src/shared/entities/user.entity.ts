import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ type: 'varchar', length: 20, unique: true, name: 'username' })
  @ApiProperty()
  username: string;

  @Column({ type: 'varchar', length: 100, unique: true, name: 'email' })
  @ApiProperty({ maxLength: 20 })
  email: string;

  @Column({ type: 'varchar', length: 255, name: 'password' })
  @ApiProperty({ maxLength: 255 })
  password: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  @ApiProperty()
  updatedAt: Date;
}
