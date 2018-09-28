var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
var conn = process.env.PORT ? 'mongodb://admin:admin123@ds115193.mlab.com:15193/todo-app' : 'mongodb://localhost:27017/TodoApp';
mongoose.connect(conn);

module.exports = {
    mongoose
};