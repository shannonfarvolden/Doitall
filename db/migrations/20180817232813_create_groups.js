
exports.up = function(knex, Promise) {
  return knex.schema.createTable('groups', table => {
    table.increments('id');
    table.string('title');
    table.text('description');
    table.string('category');
    table.boolean('public');
    table.integer('group_size');
    table.integer('owner').references('users.id').onDelete('CASCADE');
    table.timestamps(false, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('groups');
};
