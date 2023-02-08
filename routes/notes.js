//this file will do routes for /api/notes
const notes = require('express').Router();

const path = require('path');
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');
var uniqid = require('uniqid'); 
let database = require('../db/db.json')
const fs = require('fs');

//reads the db.json file and returns all saved notes as JSON.
notes.get('/', (req, res) => {
    console.log("GET request to /api/notes made")
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
})

//Receives a new note to save on the request body, adds it to the `db.json` file, and then returns the new note to the client. 
//uniqid npm package used to generate unique id's 
notes.post('/', (req, res) => {
    console.log("POST request to /api/notes made")

    const {title, text} = req.body;

    if (title && text){     
        const newNote = {
            id: uniqid('note-'),
            title,
            text
        }
    
        readAndAppend(newNote, './db/db.json')

        const response = newNote
      
        res.json(response)
    }
    else{
        console.log("ERROR POSTING NEW NOTE")
    }  
})

// DELETE /api/notes/:id receives a query parameter that contains the id of a note to delete. 
//Reads all notes from the db.json file, removes the note with the given id property, and then rewrite the notes to the db.json file.
notes.delete('/:id', (req, res) => {
    console.log("DELETE request to /api/notes made")

    let id = req.params.id
    console.log(`id = ${id}`)

    let updatedDB = database.filter(item => item.id !== id)
    console.log(`updatedDB = ${updatedDB}`)

    writeToFile('./db/db.json', updatedDB) 
    
    database = updatedDB

    res.json(updatedDB);
})

module.exports = notes;