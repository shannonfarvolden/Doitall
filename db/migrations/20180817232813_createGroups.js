
exports.up = function(knex, Promise) {
  return knex.schema.createTable('groups', table => {
    table.increments('id');
    table.string('title');
    table.text('description');
    table.timestamps(false, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('groups');
};
