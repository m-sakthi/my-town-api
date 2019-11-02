/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    emailAddress: {
      type: 'string',
      unique: true,
      isEmail: true,
      maxLength: 200,
      example: 'carol.reyna@microsoft.com'
    },

    password: {
      type: 'string',
      required: true,
      description: 'Securely hashed representation of the user\'s login password.',
      protect: true,
      example: 'somePass#123'
    },

    firstName: {
      type: 'string',
      required: true,
      description: 'User\'s first name',
      maxLength: 60,
      example: 'Microwave'
    },

    lastName: {
      type: 'string',
      required: true,
      description: 'User\'s last name',
      maxLength: 60,
      example: 'Lisa'
    },

    mobileNo: {
      type: 'string',
      unique: true,
      maxLength: 20,
      regex: /^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/i,
      description: 'Mobile number for OTP verification and other services.',
      example: '+912342424234',
    },

    gender: {
      type: 'string',
      isIn: ['male', 'female', 'other'],
      description: 'Gender',
      example: 'male'
    },

    location: {
      model: 'location'
    },

    addresses: {
      collection: 'address',
      via: 'user',
      through: 'useraddress',
    },

  },

  customToJSON: function () {
    let user = _.omit(this, ['password', 'authenticationToken']);
    return {
      ...user,
      fullName: user.firstName + " " + user.lastName,
      initials: pickInitials(user.firstName, user.lastName),
    };
  },

};

const pickInitials = (firstName, lastName) => {
  let initial;
  if (firstName && lastName)
    initial = firstName[0] + lastName[0];
  else if (firstName)
    initial = firstName.slice(0, 2);
  else if (lastName)
    initial = lastName.slice(0, 2);
  
  return initial.toUpperCase();
};
