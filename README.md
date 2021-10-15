Part 1: Initalize the environment
    To create this backend 
        1. Ensure you're in the right directory. It should be outside of your front end
        2. Run "npm init -y" to initalize it as an npm package
        3. Now install Express into the project using "npm install --save express"
        4. Then create a new folder inside the backend folder called "src"
        5. Then create a file in that src folder called "server.js"
            - server.js will be the entry point for our application
        6. Currently node.js doesn't have native support for JS modern ES6 syntax
            - We'll have to make a few small changes to allow us to use ES6
            - Running "create react app" on the frontend takes care of this change for us
        7. First install a few packages from Babel
            - Run "npm install --save-dev @babel/core @babel/node @babel/preset-env"
        8. Then we have to create a new file inside our backend directory ".babelrc"
            - This file is where we tell babel how we want it to transform the ES6 code that we write
            into common JS code that node.js can execute
        9. Put this into the ".babelrc" file to do so:
            {
                "presets": ["@babel/preset-env"]
            }
        10. Now you're free to begin coding the backend!
Part 2: 
    Testing backend 
        1. To test our backend, we'll want to develop a feature on our frontend first
        2. We'll download Postman, an API platform, to develop our backend
        3. We can use Postman to send a GET Request, at our server "http://localhost:8000/hello" from our server.js
        4. We'll also add in a route for  post requests as well.
        5. Add a new npm package to parse out JSON data sent with requests 
            -  "npm install --save body-parser"
        6. We'll also add nodemon to our server, to automatically run our server when updated
            - npm install --save-dev nodemon 
            - npx nodemon --exec babel-node src/server.js
            - So whenever we make any changes to our server, nodemon will automically restart our server with our updated code
Part 3:
    Adding a non-relational database
        1. Previously, for adding upvotes and comments we made an artificial database 
        2. Now, using MongoDB, a non-relational database, we'll create a real database without having to worry about format
        i.e. any JSON object is acceptable. Which means data does not have to be defined in advance AND no SQL is required
        (all JS). We can use modular, reusable components.
        4. Install MongoDB by using mongod (after installing from website)
        5. Use "mongo" to make sure its installed
        6. Create new database by using "use" and name of the db. Now we can replace artifical database.
        7. Initalize projects on the terminal using the following JSON format: 
        db.projects.insert([{
        name: 'sso-request',
            upvotes: 0,
            comments: [],
            } {...
        8. db.projects.find({}).pretty() to view it nicely
        9. Find command will also allow to query for specific criteria
        10. npm install --save mongodb is a package that will allow us to connect to and modify our database from inside our express 
        server code. In other words, our data won't be wiped away everytime our server restarts
        11. You're now good to right your server code with the database! (Endpoints, client connects, db calls)
Part 4: 
    Connecting the Front & Back Endpoints
        1. Until now, we've been using Postman to test our backend instead of our frontend (Making GET/POST
        requests). It's now time to let our frontend make those requests in a single full-stack application
            - For example, when a user visits a specific article, our frontend needs to automatically make a request
            to retrieve the upvotes and comments for that article, and display that info on the correct places on the package
            - We also want to make it so that our frontend will allow users to comment and upvote articles 
            - We'll use a simple built-in API called fetch to do this (fetch is simply an async function that we can call from the frontend)
        2. You essentially rewrite your frontend methods for doing various operations with the MongoDB database, and then you refer to that 
        database using the fetch API and post/get actions!
Part 5: 
    Deploying the application
    1. Run "npm run build"
    2. Copy the build folder to the src directory in the backend so that the server can serve both the front and backends 
    with a single "npm start" command, instead of starting both the server and the frontend React application seperately. 
        - AND both the front and back ends will not run on the same port, not seperate ports as before (8000 vs 3000)
    3. Use git init to intialize the empty repositiory 
    4. Create a .gitignore file to ignore node_modules (which is quite large)
    5. Run "git add ." to add all files to be committed
        - Can use git status to check on which files 
    6. Use "git commit -m "..."" to add a commit and a commit message
    7. Then create a new repository in github, and copy these two commands to the terminal to connect the repositiory   
        -  git remote add origin https://github.com/cameroncfranklin/portfolio-webapplication-public.git  (just insert the link git gives you)
        - git push -u origin main