const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');
const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
    text: 'First test todo',
    _id: new ObjectID()
}, {
    text: 'Second test todo',
    _id: new ObjectID(),
    completed: true,
    completedAt: 333
}]

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        var text = 'Text todo text';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should not create todo with invalid body data', (done) => {
        var text = '';

        request(app)
            .post('/todos')
            .send({text})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(todos.length);
                    done();
                }).catch((e) => done(e));
            })
    })
});

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    });
});

describe('GET /todos/:id', () => {
    it('should return todo doc', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });

    it('should return 404 if todo not found', (done) => {
        request(app)
            .get(`/todos/${new ObjectID().toHexString()}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 for non-object id\'', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}1`)
            .expect(404)
            .end(done);
    });
});

describe('DELETE /todos/:id', () => {
    it('should remove a todo', (done) => {
        request(app)
            .delete(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end((err,res) => {
                if (err) {
                    return done(err);
                }
                Todo.findById(todos[0]._id.toHexString())
                    .then((todo) => {
                        expect(todo).toBe(null);
                        done();
                    }).catch((e) => done(e));
            });
    });

    it('should return 404 if todo not found', (done) => {
        request(app)
            .delete(`/todos/${new ObjectID().toHexString()}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 if id not valid', (done) => {
        request(app)
            .delete(`/todos/${todos[0]._id.toHexString()}1`)
            .expect(404)
            .end(done);
    });
});

describe('PATCH /todos/:id', () => {
    it('should update the todo', (done) => {
        request(app)
            .patch(`/todos/${todos[0]._id.toHexString()}`)
            .send({
                text: "Patch test",
                completed: true
            }).expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe('Patch test');
                expect(res.body.todo.completed).toBe(true);
                expect(typeof res.body.todo.completedAt).toBe('number');
            })
            .end((err,res) => {
                if (err) {
                    return done(err);
                }
                Todo.findById(todos[0]._id.toHexString())
                    .then((todo) => {
                        expect(todo.text).toBe('Patch test');
                        expect(todo.completed).toBe(true);
                        expect(typeof todo.completedAt).toBe('number');
                        done();
                    }).catch((e) => done(e));
            });
    });

    it('should clear completedAt when todo is not completed', (done) => {
        request(app)
            .patch(`/todos/${todos[1]._id.toHexString()}`)
            .send({
                text: "Patch test 2",
                completed: false
            }).expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe('Patch test 2');
                expect(res.body.todo.completed).toBe(false);
                expect(res.body.todo.completedAt).toBe(null);
            })
            .end((err,res) => {
                if (err) {
                    return done(err);
                }
                Todo.findById(todos[1]._id.toHexString())
                    .then((todo) => {
                        expect(todo.text).toBe('Patch test 2');
                        expect(todo.completed).toBe(false);
                        expect(todo.completedAt).toBe(null);
                        done();
                    }).catch((e) => done(e));
            });
    })
})