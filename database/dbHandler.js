/*
Just a standard DB handler

I'm currently using MongoDB for this, as there shouldn't really be any relations in it
*/
const {MongoClient} = require('mongodb');
const bcrypt = require('bcrypt')

import {uri, saltRounds} from "./dbconsts";

export default class dbConn {
    // Opens a connection to the DB
    constructor() {
        // Currently just a simple MongoDB
        this.client = new MongoClient(uri);
        await client.connect();
        const db = this.client.db('recipes');
        this.userCollection = db.collection('users');
        this.recipeCollection = db.collection('recipes');
    }

    /*
    User Auth stuff

    Because this DB will be user modifiable, I figure I should do some user authentication
    */
    // Adds a user
    async addUser(username, password) {
        bcrypt.genSalt(saltRounds, (err, salt)=> {
            if(err) throw err;
            bcrypt.hash(password, salt, (err, hash)=>{
                if(err) throw err;
                const data = {user: username, pass: hash};
                this.userCollection.insertOne(data);
            });
        });
    }

    // Compares the provided password to the stored hash
    async authenticateUser(username, password) {
        const userdata = await this.userCollection.findOne({name:username});
        if (userdata === 0) {
            // Do user not found
            return false;
        }
        hash = userdata.password;
        // Check the password
        let res = await bcrypt.compare(password, hash);
        if(res) {
            return true;
        }
        else {
            return false;
        }
    }

    // Remove a user, user must be signed in to delete it
    async deleteUser(username) {
    
    }

    /*
    The actual recipe handling stuff
    */
    // Takes a recipe JSON and adds it to the database
    async addRecipe(recipe) {
        // May want to validate the file's format, but given everything's generated it should be correct
        return await this.recipeCollection.insertOne(recipe);
    }

    // Takes an updated recipe and replaces the DB's instance of it
    async updateRecipe(changes) {
        // TODO: Probably should decide how I want to do this
    }
    
    // Gets a specific recipe from the DB using it's ID
    async getRecipe(id) {
        let content = await this.recipeCollection.findOne({_id: id});
        return content;
    }

    async getByName(name) {
        let content = await this.recipeCollection.findOne({name: name});
        return content;
    }

    // Gets a complete list of recipe names and their IDs
    getRecipeList() {
        let content = this.recipeCollection.find({} , {'name': 1});
        return content;
    }
}