import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable("spotenu_users", (table) => {
    table.string("id").primary().notNullable();
    table.string("name", 255).notNullable();
    table.string("username", 255).notNullable();
    table.string("email", 255).notNullable();
    table.string("password", 255).notNullable();
    table.enum("role", ["admin", "band", "regular", "premium"]).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable("spotenu_users");
}
