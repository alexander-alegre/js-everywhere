module.exports = {
  notes: async (_parent, _args, { models }) => await models.Note.find(),
  note: async (_parent, args, { models }) => {
    const note = await models.Note.findById(args.id);
    if (!note) {
      throw new Error('Failed to fetch note');
    }
    return note;
  },
};
