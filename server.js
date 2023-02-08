const express = require('express');
app = express()
const path = require('path');
const fs = require('fs');
const { readFromFile, readAndAppend } = require('./helpers/fsUtils');
const api = require('./routes/index');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))

//modular routing
app.use("/api", api)

//get redirected to notes.html on clicking the 'get started' button
app.get('/notes', (req, res) => {
    console.log('/notes get route used')
    res.sendFile(path.join(__dirname, "/public/notes.html"))
})

//fallback path takes user to homepage
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"))
})

//establish and open port
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});