module.exports = {

  friendlyName: 'Create',

  description: 'Create Address.',

  inputs: {
    isPrimary: {
      type: 'boolean',
      description: 'true/false. Whether this location is primary for user',
      example: false,
    },

    doorNo: {
      type: 'string',
      required: true,
      description: 'Door/Flat/Building number',
      example: '7G'
    },

    line1: {
      type: 'string',
      required: true,
      description: 'Street/Locality name',
      example: 'Rainbow Colony'
    },

    line2: {
      type: 'string',
      description: 'Area/Villege/Town/District name',
      example: 'Kotturpuram, Chennai'
    },

    state: {
      type: 'string',
      required: true,
      description: 'State',
      example: 'Tamilnadu'
    },

    landmark: {
      type: 'string',
      description: 'Landmark',
      example: 'ABC Apartment'
    },

    pincode: {
      type: 'string',
      required: true,
      description: 'Pincode for your address',
      example: '600001'
    },

    latitude: {
      type: 'string',
      description: 'latitude details',
      example: '15.887376'
    },

    longitude: {
      type: 'string',
      description: 'longitude details',
      example: '15.887376'
    },

    parentType: {
      type: 'string',
      required: true,
      isIn: ['user', 'outlet'],
      description: 'Parent Type can be user/outlet',
      example: 'user'
    },

    parentId: {
      type: 'number',
      required: true,
      description: 'User/Outlet ID',
      example: 1
    }

  },

  exits: {
    invalid: {
      responseType: 'badRequest',
    },

    notFound: {
      responseType: 'notFound',
    },
  },

  fn: async function (inputs, exits) {
    const { parentType, parentId } = inputs;

    let child = await sails.config.knex(parentType)
      .where({ id: parentId }).first();

    if (!child) exits.notFound({ error: parentType + ' not found.' });

    let newRecord = await Address.create({...inputs, user: this.req.currentUser.id})
      .intercept({ name: 'UsageError' }, 'invalid')
      .fetch();

    await sails.config.knex(parentType + 'address')
      .insert({ [parentType]: parentId, address: newRecord.id });

    return exits.success({ ...newRecord, [parentType]: child });

  }

};