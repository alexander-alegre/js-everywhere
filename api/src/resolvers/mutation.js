// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const {
//   AuthenticationError,
//   ForbiddenError,
// } = require('apollo-server-express');
// const mongoose = require('mongoose');
// require('dotenv').config();

// const gravatar = require('../util/gravatar');

// const saltRounds = 10;

// const passwordEncrypt = async password => await bcrypt.hash(password, rounds);
// const checkPassword = async (plainTextPassword, hashedPassword) => {
//   return await bcrypt.compare(hashedPassword, plainTextPassword);
// };
// const generateJWT = async user =>
//   await jwt.sign({ id: user._id }, process.env.JWT_SECRET);
// validateJWT = async token => await jwt.verify(token, process.env.JWT_SECRET);

module.exports = {
  newNote: async (_parent, args, { models }) => {
    return await models.Note.create({
      content: args.content,
      author: 'Alexander Alegre',
    });
  },
  deleteNote: async (_parent, { id }, { models }) => {
    try {
      await models.Note.findOneAndRemove({ _id: id });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
  updateNote: async (_parent, { id, content }, { models }) => {
    try {
      return await models.Note.findOneAndUpdate(
        { _id: id },
        { $set: { content } },
        { new: true },
      );
    } catch (error) {
      console.error(error);
      throw new Error('Error updating note');
    }
  },
};
