const knex = require('../db');

const GroupsController = {
  // GET: List all the groups
  index (req, res, next) {
    knex
      .select()
      .from('groups')
      .orderBy('created_at', 'DESC')
      .then(groups => {
        res.json(groups);
      });
  },

  //POST: Creating new group
  async create (req, res, next) {
    const title = "Test Title";
    const description = "Test Description" ;
    try {
      await knex
        .insert({title, description})
        .into('groups')
      res.json({ message: 'New group created!' });
    } catch (error) {
      res.send(error);
    }
  }
 };

module.exports = GroupsController;
