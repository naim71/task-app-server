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
        // app.get('/products', async (req, res) => {
        //     const query = {};
        //     const products = await productsCollection.find(query).toArray();
        //     res.send(products);
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
        // app.get('/products/:seller', async (req, res) => {
        //     const seller = req.params.seller;
        //     console.log(seller);
        //     const query = { seller: seller }
        //     const product = await productsCollection.find(query).toArray();
        //     res.send(product);
        // })
        // app.put('/products/:seller', async (req, res) => {
        //     const seller = req.params.seller;
        //     const filter = { seller: seller }
        //     const options = { upsert: true };
        //     const updatedDoc = {
        //         $set: {
        //             verification: 'verified'
        //         }
        //     }
        //     const result = await productsCollection.update(filter, updatedDoc, options);
        //     res.send(result);
        // })
        // app.delete('/product/:id', async (req, res) => {
        //     const id = req.params.id;
        //     const filter = { _id: ObjectId(id) };
        //     const result = await productsCollection.deleteOne(filter);
        //     res.send(result);
        // })


        // app.get('/products/categories/:categoryId', async (req, res) => {
        //     const id = req.params.categoryId;
        //     console.log(id);
        //     const query = { categoryId: id };
        //     console.log(query);
        //     const productresult = await productsCollection.find(query).toArray();
        //     console.log(productresult);
        //     res.send(productresult);
        // })

        // //checking if user is admin
        // app.get('/users/admin/:email', async (req, res) => {
        //     const email = req.params.email;
        //     const query = { email }
        //     const user = await usersCollection.findOne(query);
        //     res.send({ isAdmin: user?.role === 'admin' });
        // })

        // // app.get('/users/:id', async (req, res) => {
        // //     const id = req.params.id;
        // //     console.log(id);
        // //     const query = { _id: ObjectId(id) }
        // //     const user = await usersCollection.findOne(query);
        // //     res.send(user);
        // // })

        // //delete seller
        // app.delete('/users/seller/:email', async (req, res) => {
        //     const email = req.params.email;
        //     const filter = { email: email };
        //     const result = await usersCollection.deleteOne(filter);
        //     res.send(result);
        // })
        // app.put('/users/:id', async (req, res) => {
        //     const id = req.params.id;
        //     const filter = { _id: ObjectId(id) }
        //     const options = { upsert: true };
        //     const updatedDoc = {
        //         $set: {
        //             status: 'verified'
        //         }
        //     }
        //     const result = await usersCollection.updateOne(filter, updatedDoc, options);
        //     res.send(result);
        // })

        // //jwt token
        // app.get('/jwt', async (req, res) => {
        //     const email = req.query.email;
        //     const query = { email: email }
        //     const user = await usersCollection.findOne(query);
        //     if (user) {
        //         const token = jwt.sign({ email }, process.env.ACCESS_TOKEN, { expiresIn: '10h' })
        //         return res.send({ accessToken: token })
        //     }
        //     console.log(user);
        //     res.status(403).send({ accessToken: '' })
        // })

    }
    finally {

    }
}
run().catch(console.log);

app.get('/', async(req, res) =>{
    res.send('Server is running');
})

app.listen(port, ()=> console.log(`Server running on ${port}`))