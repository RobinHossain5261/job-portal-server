const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const port = process.env.PORT || 5000;

const app = express();

//middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nbqc6.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {

        const allJobsCollection = client.db('Job-portal').collection('allJobs');

        app.get('/allJobs', async (req, res) => {
            const query = {};
            const options = await allJobsCollection.find(query).toArray();
            res.send(options);
        })

        app.get('/allJobs/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const jobs = await allJobsCollection.findOne(query);
            res.send(jobs)
        })

    }
    finally {

    }
}
run().catch(console.log);


app.get('/', async (req, res) => {
    res.send('Job-portal server is running');
})

app.listen(port, () => console.log(`Job-portal running on ${port}`));