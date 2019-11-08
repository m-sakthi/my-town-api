module.exports = {

  friendlyName: 'Update',

  description: 'Update Address.',

  inputs: {
    id: {
      type: 'number',
      required: true,
      description: 'Address ID',
      example: 1
    },

    isPrimary: {
      type: 'boolean',
      description: 'true/false. Whether this location is primary for user',
      example: false,
    },

    doorNo: {
      type: 'string',
      description: 'Door/Flat/Building number',
      example: '7G'
    },

    line1: {
      type: 'string',
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
      isIn: ['user', 'outlet'],
      description: 'Parent Type can be user/outlet',
      example: 'user'
    },

    parentId: {
      type: 'number',
      description: 'User/Outlet ID',
      example: 1
    }

  },

  exits: {
    invalid: {
      responseType: 'badRequest',
    },

    insufficientPrivilege: {
      responseType: 'forbidden',
    },

    notFound: {
      statusCode: 404,
      description: 'Not found',
    },
  },

  fn: async function (inputs, exits) {
    let address = await Address.findOne(inputs.id);
    if (!address) return exits.notFound({ error: 'Address not found' });
    
    if (address.user !== this.req.currentUser.id)
      return exits.insufficientPrivilege();

    const { parentType, parentId } = inputs;

    let updatedRecord = await Address.updateOne(inputs.id)
      .set(inputs)
      .intercept({ name: 'UsageError' }, 'invalid');

    if (parentType && parentId) {
      let child = await sails.config.knex(parentType)
        .where({ id: parentId }).first();
  
      if (!child) exits.notFound({ error: parentType + ' not found.' });
  
      await sails.config.knex(parentType + 'address')
        .insert({ [parentType]: parentId, address: newRecord.id });

      updatedRecord = { ...updatedRecord, [inputs.parentType]: child }
    }

    return exits.success(updatedRecord);

  }

};