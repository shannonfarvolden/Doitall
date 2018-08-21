// Join Table for groups and users
// Many to Many relationship
exports.up = function(knex, Promise) {
  return knex.schema.createTable('group_members', table => {
    table.increments('id');
    table.integer('group_id').references('groups.id').onDelete('CASCADE');
    table.integer('user_id').references('users.id').onDelete('CASCADE');
    table.timestamps(false, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('group_members');
};
