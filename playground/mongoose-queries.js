const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');
const {mongoose} = require('./../server/db/mongoose');
const {ObjectID} = require('mongodb');

var id = '5bad173f9ca30204c4fa4a4a';
var uID = '5bad070c71c0ae05e4cf630e';

// if (!ObjectID.isValid(id)){
//     console.log('ID not valid');
// };

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos', todos);
// });

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo', todo);
// });

// Todo.findById(id).then((todo) => {
//     if (!todo) {
//         return console.log('ID not found');
//     }
//     console.log('Todo', todo);
// }).catch((e) => console.log(e));

User.findById(uID).then((user) => {
        if (!user) {
            return console.log('ID not found');
        }
        console.log('User', user);
    }, (e) => {
        console.log(e);
    });