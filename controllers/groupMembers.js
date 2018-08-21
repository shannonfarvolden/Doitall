const knex = require('../db');

const GroupMembersController = {
  //POST: Join group and user
  async create (req, res, next) {
    const id = req.params.groupId;
    // Member Ids stored in Array
    const {memberIdArr} =  req.body;
    for(memberId in memberIdArr) {
      let user_id = memberIdArr[memberId];
      await knex
        .insert({group_id: id, user_id})
        .into('group_members')
        .catch(error => res.send(error));
      res.send({ message: 'New members added to the group' });
    }
  }
 };

module.exports = GroupMembersController;
