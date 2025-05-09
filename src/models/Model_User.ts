//Author: Revelation A.F
//Git: nusktec
//
import { Model, Table, Column, DataType, BelongsToMany } from 'sequelize-typescript';
import bcrypt from 'bcryptjs';

@Table({ tableName: 'sq_users' })
export class Model_User extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: 'user'
  })
  role!: string;

  @Column({
    type: DataType.JSON,
    allowNull: false,
    defaultValue: []
  })
  level!: any;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isVerified!: boolean;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  status!: boolean;

  // @BelongsToMany(() => Role, () => UserRole)
  // roles!: Role[];

  async comparePassword(password: string) {
    return await bcrypt.compare(password, this.password);
  }
}
