
const fs = require('fs');
const db = require('../db/db.json');

module.exports = (app) => {
    app.get('/api/notes', (req, res) => {
        fs.readFile('./db/db.json','utf8', (err, data) => {
            if (err) throw err;
            const noteData = JSON.parse(data)
            res.json(noteData) 
        })
       
    });
    

    app.post('/api/notes', (req, res) => {
        let newNote = req.body;
        console.log(newNote);
        fs.readFile('./db/db.json','utf8', (err, data) => {
            if (err) throw err;
            const allNotes = JSON.parse(data)
            newNote.id = allNotes.length+1
            console.log(newNote);
            allNotes.push(newNote)

            fs.writeFile('./db/db.json', JSON.stringify(allNotes), (err, data) => {
                if (err) throw err;
                res.json(allNotes)
            })
        })
    });
}