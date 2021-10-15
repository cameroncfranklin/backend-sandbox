import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb'; 
import path from 'path';




/* Now let's set up an app object, where we can define different 
 endpoints for our app, and what we want it to do when one of those 
 endpoints is hit*/
const app = express();
// This tells our server where to serve static files such as images from
app.use(express.static(path.join(__dirname, '/build')));
// This will parse the JSON from our request
app.use(bodyParser.json()); 

// This function will take care of all of the reusable setup/teardown code (connecting to db, connecting to client, etc.)
const withDB = async (operations, res) => {
    try {
        // Now comes the mongoDB database part
        const client = await MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }); // That is the default port
        const db = client.db('portfolio-db'); // Set db to the name of our database
        
        // This is our operations argument (function, for upvote, comment, etc.)
        await operations(db);
        
        client.close();
    } catch (error) {
        res.status(500).json({ message: 'Error connecting to db', error });
    }  
}
// Endpoint to route PROJECT information requests
app.get('/api/projects/:name', async (req, res) => {
    withDB(async(db) => {
            const projectName = req.params.name;

            const projectInfo = await db.collection('projects').findOne({ name: projectName });
            res.status(200).json(projectInfo);
    }, res);
});

// Endpoint to send UPVOTE requests to (refactored to MongoDB)
app.post('/api/projects/:name/upvote', async (req, res) => {
    withDB(async (db) => {
        const projectName = req.params.name;

        const projectInfo = await db.collection('projects').findOne({ name: projectName });
        // This query is where we increment the number of upvotes
        await db.collection('projects').updateOne({ name: projectName }, {
            '$set': {
                upvotes: projectInfo.upvotes + 1,
            },
        });
        const updatedProjectInfo = await db.collection('projects').findOne({ name: projectName });
    
        res.status(200).json(updatedProjectInfo);
    }, res);

    // vv Code from artificial database, not MongoDB
    // projectsInfo[projectName].upvotes += 1;
    // res.status(200).send(`${projectName} now has ${projectsInfo[projectName].upvotes} upvotes!`);
});

// Endpoint to route COMMENT requests 
app.post('/api/projects/:name/add-comment', (req, res) => {
    const { username, text } = req.body;
    const projectName = req.params.name;

    withDB(async (db) => {
        const projectInfo = await db.collection('projects').findOne({ name: projectName });
        await db.collection('projects').updateOne({ name: projectName }, {
            '$set': {
                comments: projectInfo.comments.concat({ username, text }),
            },
        });
        const updatedProjectInfo = await db.collection('projects').findOne({ name: projectName });
        
        res.status(200).json(updatedProjectInfo);
    }, res);
});
// This tells our app that all requests that aren't caught by other API routes should be passed to our app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/build/index.html'));
});
// Now we have to start our server, by telling our app to listen to a certain port. 
app.listen(8000, () => console.log('Listening on port 8000'));
// Also has a callback function with a body that logs the ports.

// Now we just need node.js to run our express server using "npx babel-node src/server.js





// Artificial database

// const projectsInfo = {
//     'sso-request': {
//         upvotes: 0,
//         comments: [],
//     },
//     'task-updater': {
//         upvotes: 0,
//         comments: [],
//     },
//     'iris': {
//         upvotes: 0,
//         comments: [],
//     },
// }


/*  Previous endpoints code 

// When we hit the endpoint /hello on a GET request, it will respond with a message saying hello
app.get('/hello', (req, res) => res.send('Hello!'));
// Callback has two main arguments req (request) and res (response) with a body that sends a request back

// Allows the server to take a value out of our URL
app.get('/hello/:name', (req, res) => res.send(`Hello ${req.params.name}`));

// Make a route for POST requests as well
app.post('/hello', (req, res) => res.send(`Hello ${req.body.name}!`));


*/