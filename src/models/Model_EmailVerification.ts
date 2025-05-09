//Author: Revelation A.F
//Git: nusktec
//
import { Model, Table, Column, DataType } from 'sequelize-typescript';

@Table({ tableName: 'sq_email_verifications' })
export class Model_EmailVerification extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  }) id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  }) email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  }) code!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: false,
  }) iaVerified!: boolean;
}
