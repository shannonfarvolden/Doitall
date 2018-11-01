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
      })
      .catch(error => res.send(error));
  },

  //POST: Creating new group
  async create (req, res, next) {
    const {title, description, category, is_public, group_size, owner} =  req.body;
    await knex
      .insert({title, description, category, is_public, group_size, owner})
      .into('groups')
      .catch(error => res.send(error));
    res.send({ message: 'New group created!' });
  },

  // GET: List all members belong to the group
  getMembers(req, res, next) {
    const id = req.params.groupId;
    try{
      knex
        .select('user_id')
        .from('group_members')
        .where({group_id: id})
        .then(members => {
          res.json(members);
        })
        .catch(error => res.send(error));
    } catch (error) {
      res.send(error);
    }
  },

 };

module.exports = GroupsController;
