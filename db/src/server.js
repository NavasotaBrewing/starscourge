const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const epilogue = require('epilogue')

let app = express()
app.use(cors())
app.use(bodyParser.json())

// For ease of this tutorial, we are going to use SQLite to limit dependencies
let database = new Sequelize({
    dialect: 'sqlite',
    storage: './brewkit.sqlite',
    operatorsAliases: Sequelize.Op,
})

// Define our scene model
// id, createdAt, and updatedAt are added by sequelize automatically
let Scene = database.define('scene', {
    name: Sequelize.STRING,
    description: Sequelize.STRING,
    rtus: Sequelize.JSON,
}, {
    // I'm not sure i need this but i'm too lazy to check
    timestamps: false
});

// Initialize epilogue
epilogue.initialize({
    app: app,
    sequelize: database
});

// Create the dynamic REST resource for our Scene model
let userResource = epilogue.resource({
    model: Scene,
    endpoints: ['/scenes', '/scene/:id']
});

// Resets the database if true and launches the express app on :8081
database
    .sync({ force: true })
    .then(() => {
        app.listen(8081, () => {
            console.log('listening to port localhost:8081')
        })
    });
