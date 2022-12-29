const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());


//mongodb connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4evolx3.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {    //db collections
        const tasksCollection = client.db('task').collection('tasks');
        const usersCollection = client.db('task').collection('users');

        //CRUD operations
        app.get('/tasks', async (req, res) => {
            const query = {};
            const task = await tasksCollection.find(query).toArray();
            res.send(task);
        })

        app.get('/task', async (req, res) => {
            const email = req.query.email;
            const query = { email: email };
            const tasks = await tasksCollection.find(query).toArray();
            res.send(tasks);
        });
        //  app.get('/tasks/:email', async (req, res) => {
        //     const email = req.params.email;
        //     const query = { email }
        //     const result = await tasksCollection.findOne(query);
        //     res.send(result);
        // })

        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await usersCollection.insertOne(user);
            res.send(result);

        })
        app.post('/tasks', async (req, res) => {
            const task = req.body;
            const result = await tasksCollection.insertOne(task);
            res.send(result);
        })

        app.get('/tasks/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await tasksCollection.findOne(query);
            res.send(result);
        })
        app.delete('/tasks/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const result = await tasksCollection.deleteOne(filter);
            res.send(result);
        })
      
        app.put('/tasks/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) }
            const options = { upsert: true };
            const updatedDoc = {
                $set: {
                    status: 'completed'
                }
            }
            const result = await tasksCollection.updateOne(filter, updatedDoc, options);
            res.send(result);
        })
       
    }
    finally {

    }
}
run().catch(console.log);

app.get('/', async (req, res) => {
    res.send('Server is running');
})

app.listen(port, () => console.log(`Server running on ${port}`))