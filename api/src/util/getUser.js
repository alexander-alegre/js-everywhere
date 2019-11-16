const jwt = require('jsonwebtoken');

const getUser = async token => {
  if (token) {
    try {
      return await jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      console.error(error);
      throw new Error('Session invalid');
    }
  }
};

module.exports = getUser;
