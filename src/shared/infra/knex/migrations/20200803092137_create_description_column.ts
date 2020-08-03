import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.table("spotenu_users", (table) => {
    table.text("description");
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.table("spotenu_users", (table) => {
    table.dropColumn("description");
  });
}
