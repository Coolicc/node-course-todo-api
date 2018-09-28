const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');
const {mongoose} = require('./../server/db/mongoose');
const {ObjectID} = require('mongodb');

Todo.remove({}).then((result) => {
    console.log(result);
});

Todo.findByIdAndRemove('asd').then((result) => {
    console.log(result);
});

Todo.findOneAndRemove({ _id: 'asd'}).then((result) => {
    console.log(result);
});