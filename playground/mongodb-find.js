// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
       return console.log('Unable to connect to MongoDB server.');
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    // db.collection('Todos').find({
    //     _id: new ObjectID('5bacf512dc313ae02f19e832')
    // }).toArray().then((docs) => {
    //     console.log('Todos\n' + JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('Unable to fetch documents', err);
    // });

    // db.collection('Todos').find().count().then((count) => {
    //     console.log('Todos count: ' + JSON.stringify(count));
    // }, (err) => {
    //     console.log('Unable to fetch documents', err);
    // });

    db.collection('Users').find({
        name: 'Ognjen'
    }).toArray().then((docs) => {
        console.log('Users named Ognjen:\n' + JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch documents', err);
    });

    //client.close();
});