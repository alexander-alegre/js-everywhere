const mongoose = require('mongoose');

module.exports = {
  connect: DB_HOST => {
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useFindAnyModify', false);
    mongoose.set('useCreateIndex', true);
    mongoose.connect(DB_HOST);
    mongoose.connection.on('error', error => {
      console.log('MongoDB:', error);
      process.exit();
    });
  },
  close: () => {
    mongoose.connection.close();
  },
};
