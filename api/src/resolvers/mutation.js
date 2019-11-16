module.exports = {
  newNote: async (_parent, args, { models }) => {
    return await models.Note.create({
      content: args.content,
      author: 'Alexander Alegre',
    });
  },
};
