var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.PORT);

module.exports = {
    mongoose
};