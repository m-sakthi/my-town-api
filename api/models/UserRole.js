/**
 * UserRole.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'user_role',

  attributes: {

    user: {
      model: 'user'
    },

    role: {
      model: 'role'
    },

    resourceId: {
      type: 'number',
      allowNull: true,
      description: 'Resource Id can be any of other model id'
    },

    resourceType: {
      type: 'string',
      allowNull: true,
      description: 'Can be any other model name'
    }

  },

  beforeCreate: async function  (values, cb) {
    const userRole = await UserRole.findOne({
      user: values.user,
      role: values.role
    })
    if (userRole) return cb('User and Role combination already exists.');

    cb(null, values);
  }

};



