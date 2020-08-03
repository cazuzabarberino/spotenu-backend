import getConnection from "./getConnection";
import Knex from "knex";

export default class BaseRepository {
  protected connection: Knex;

  constructor(protected readonly tableName: string) {
    this.connection = getConnection();
  }

  protected async create(data: any) {
    await this.connection.insert(data).into(this.tableName);
  }
}
