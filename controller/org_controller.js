const Organisation = require('../models/organisation');
const User = require('../models/user');

const getOrganisations = async (req, res) => {
  const { userId } = req.user;

  try {
    const { data: organisations, error: orgError } = await Organisation.findByUserId(userId);

    if (orgError || !organisations) {
      throw new Error('Organisations not found');
    }

    res.status(200).json({
      status: 'success',
      message: 'Organisations retrieved successfully',
      data: { organisations }
    });
  } catch (error) {
    res.status(404).json({ status: 'Not found', message: error.message, statusCode: 404 });
  }
};

const getOrganisation = async (req, res) => {
  const { orgId } = req.params;

  try {
    const { data: organisation, error: orgError } = await Organisation.findById(orgId);

    if (orgError || !organisation) {
      throw new Error('Organisation not found');
    }

    res.status(200).json({
      status: 'success',
      message: 'Organisation retrieved successfully',
      data: {
        orgId: organisation.orgId,
        name: organisation.name,
        description: organisation.description,
      }
    });
  } catch (error) {
    res.status(404).json({ status: 'Not found', message: error.message, statusCode: 404 });
  }
};

const createOrganisation = async (req, res) => {
  const { name, description } = req.body;
  const { userId } = req.user;

  if (!name) {
    return res.status(422).json({
      errors: [
        { field: 'name', message: 'Name is required' },
      ]
    });
  }

  try {
    const { data: organisation, error: orgError } = await Organisation.create({
      name,
      description,
      userId
    });

    if (orgError) {
      throw new Error('Organisation creation unsuccessful');
    }

    res.status(201).json({
      status: 'success',
      message: 'Organisation created successfully',
      data: {
        orgId: organisation.orgId,
        name: organisation.name,
        description: organisation.description,
      }
    });
  } catch (error) {
    res.status(400).json({ status: 'Bad request', message: error.message, statusCode: 400 });
  }
};

const addUserToOrganisation = async (req, res) => {
  const { orgId } = req.params;
  const { email } = req.body;

  if (!email) {
    return res.status(422).json({
      errors: [
        { field: 'email', message: 'Email is required' },
      ]
    });
  }

  try {
    const { data: user, error: userError } = await User.findByEmail(email);

    if (userError || !user) {
      throw new Error('User not found');
    }

    const { data: organisation, error: orgError } = await Organisation.findById(orgId);

    if (orgError || !organisation) {
      throw new Error('Organisation not found');
    }

    // Update the organisation's userId to include the new user
    // Implement the necessary logic to update the organisation

    res.status(200).json({
      status: 'success',
      message: 'User added to organisation successfully',
      data: {
        userId: user.userId,
        orgId: organisation.orgId,
      }
    });
  } catch (error) {
    res.status(400).json({ status: 'Bad request', message: error.message, statusCode: 400 });
  }
};

module.exports = {
  getOrganisations,
  getOrganisation,
  createOrganisation,
  addUserToOrganisation
};
