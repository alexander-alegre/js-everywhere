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
