const mongoose = require('mongoose');
const ROLES = ['user', 'admin', 'moderator'];

const roleSchema = new mongoose.Schema({
  name: String
});

module.exports = {
  roles: ROLES,
  Role: mongoose.model('Role', roleSchema)
};
