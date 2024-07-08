const User = require('../models/users');

const getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const { data: user, error: userError } = await User.findById(id);

    if (userError || !user) {
      throw new Error('User not found');
    }

    res.status(200).json({
      status: 'success',
      message: 'User retrieved successfully',
      data: {
        userId: user.userId,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
      }
    });
  } catch (error) {
    res.status(404).json({ status: 'Not found', message: error.message, statusCode: 404 });
  }
};

module.exports = { getUser };
