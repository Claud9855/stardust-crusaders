//Exporting the mongoose connection
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGOD_URI || '', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = mongoose.connection;