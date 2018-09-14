// Join Table for groups and users
// Many to Many relationship and unique combination
exports.up = function(knex, Promise) {
  return knex.schema.createTable('group_user', table => {
    table.increments('id');
    table.integer('group_id').references('groups.id').onDelete('CASCADE');
    table.integer('user_id').references('users.id').onDelete('CASCADE');
    table.unique(['group_id', 'user_id']);
    table.timestamps(false, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('group_user');
};
