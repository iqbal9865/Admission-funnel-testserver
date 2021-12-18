const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config()


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.sot4y.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const app = express()

app.use(bodyParser.json());
app.use(cors())

const port = 5000;

app.get('/', (req,res) => {
    res.send("Hello, It's Server Testing")
})

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect( err => {
  const blogsCollection = client.db("admissionFunnel").collection("blogs");
  const eventsCollection = client.db("admissionFunnel").collection("events");
  const subscribersCollection = client.db("admissionFunnel").collection("subscribers");
  const adminCollection = client.db("admissionFunnel").collection("admin");
  const webinarRegistrationCollection = client.db("admissionFunnel").collection("webinarRegistration");
  const campaignCollection = client.db("admissionFunnel").collection("campaigns");
  const onlineAdmissionCollection = client.db("admissionFunnel").collection("onlineAdmission");
  const paymentCollection = client.db("admissionFunnel").collection("payment");
   
    app.post('/addBlogs', (req, res) => {
        const blog = req.body;
        console.log(blog)
        blogsCollection.insertOne(blog)
        .then( result => {
            res.send(result.insertedCount > 0);
        })
    })

    app.get('/blogs',(req,res) => {
        blogsCollection.find()
        .toArray((err,blogs) => {
            res.send(blogs)
            console.log('From DataBase', blogs)
        })
      })

      app.post('/addEvents', (req, res) => {
        const event = req.body;
        console.log(event)
        eventsCollection.insertOne(event)
        .then( result => {
            res.send(result.insertedCount > 0);
        })
    })

    app.get('/events',(req,res) => {
        eventsCollection.find()
        .toArray((err,events) => {
            res.send(events)
            console.log('From DataBase', events)
        })
      })  

      app.post('/addSubscribers', (req, res) => {
        const subscribers = req.body;
        console.log(subscribers)
        subscribersCollection.insertOne(subscribers)
        .then( result => {
            res.send(result.insertedCount > 0);
        })
    })
    app.get('/subscribers',(req,res) => {
        subscribersCollection.find()
        .toArray((err,subscribers) => {
            res.send(subscribers)
            console.log('From DataBase', subscribers)
        })
      }) 

      app.post('/addAdmin', (req, res) => {
        const admin = req.body;
        console.log(admin)
        adminCollection.insertOne(admin)
        .then( result => {
            res.send(result.insertedCount > 0);
        })
    })
    app.post('/isAdmin',(req,res) => {
        const email = req.body.email;
        adminCollection.find({email: email})
        .toArray((err,admin) => {
            res.send(admin.length > 0)
            console.log('From DataBase', admin)
        })
      }) 


      app.post('/addWebReg', (req, res) => {
        const webReg = req.body;
        console.log(webReg)
        webinarRegistrationCollection.insertOne(webReg)
        .then( result => {
            res.send(result.insertedCount > 0);
        })
    })
    app.get('/webinarRegistration', (req, res) => {
        webinarRegistrationCollection.find()
        .toArray((err,webinarRegistration) => {
            res.send(webinarRegistration)
            console.log('From Database', webinarRegistration)
        })
    })
    app.post('/addCampaigns', (req, res) => {
        const campaign = req.body;
        console.log(campaign)
        campaignCollection.insertOne(campaign)
        .then( result => {
            res.send(result.insertedCount > 0);
        })
    })
    app.get('/campaigns', (req, res) => {
        campaignCollection.find()
        .toArray((err,campaigns) => {
            res.send(campaigns)
            console.log('From Database', campaigns)
        })
    })
    app.post('/addOnlineAdmission', (req, res) => {
        const admission = req.body;
        console.log(admission)
        onlineAdmissionCollection.insertOne(admission)
        .then( result => {
            res.send(result.insertedCount > 0);
        })
    })
    app.get('/onlineAdmission', (req, res) => {
        onlineAdmissionCollection.find()
        .toArray((err,admission) => {
            res.send(admission)
            console.log('From Database', admission)
        })
    })
    app.delete('/delete/:id',(req, res) => {
        subscribersCollection.deleteOne({_id: ObjectId(req.params.id)})
        .then((result) => {
            console.log(result)
        })
    })
    app.delete('/deleteWebReg/:id',(req, res) => {
        webinarRegistrationCollection.deleteOne({_id: ObjectId(req.params.id)})
        .then((result) => {
            console.log(result)
        })
    })
    app.delete('/deleteArticle/:id',(req, res) => {
        blogsCollection.deleteOne({_id: ObjectId(req.params.id)})
        .then((result) => {
            console.log(result)
        })
    })
    app.post('/addPayment', (req, res) => {
        const payment = req.body;
        console.log(payment)
        paymentCollection.insertOne(payment)
        .then( result => {
            res.send(result.insertedCount > 0);
        })
    })
    app.get('/payment', (req, res) => {
        paymentCollection.find()
        .toArray((err,payment) => {
            res.send(payment)
            console.log('From Database', payment)
        })
    })

});

app.listen(process.env.PORT || port)