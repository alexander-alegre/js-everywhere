module.exports = {
  notes: async (_parent, _args, { models }) => {
    await models.Note.find();
  },
  note: async (_parent, args, { models }) =>
    await models.Note.findById(args.id),
};
