const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
  AuthenticationError,
  ForbiddenError,
} = require('apollo-server-express');
const mongoose = require('mongoose');
require('dotenv').config();

const gravatar = require('../util/gravatar');

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
  signUp: async (_parent, { username, email, password }, { models }) => {
    const user = await models.User.findOne({
      $or: [{ email }, { username }],
    });
    if (user) {
      throw new Error('User already exists');
    }

    email = email.trim().toLowerCase();
    username = username.trim().toLowerCase();
    const hashed = await bcrypt.hash(password, 10);
    const avatar = gravatar(email);
    try {
      const user = await models.User.create({
        username,
        email,
        avatar,
        password: hashed,
      });
      return await jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    } catch (error) {
      console.error(error);
      throw new Error('Error creating account');
    }
  },
  signIn: async (_parent, { username, email, password }, { models }) => {
    const user = await models.User.findOne({
      $or: [{ email }, { username }],
    });
    if (!user) {
      throw new AuthenticationError('Error signing in');
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      throw new AuthenticationError('Error signing in');
    }

    return await jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  },
};
