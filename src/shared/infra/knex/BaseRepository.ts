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

  protected async find(data: any, columns: string[] = ["*"]) {
    return await this.connection
      .column(columns)
      .select()
      .where(data)
      .from(this.tableName);
  }
}
