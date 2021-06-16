
const fs = require('fs');
const db = require('../db/db.json');
const { v4: uuidv4 } = require('uuid');

module.exports = (app) => {
    app.get('/api/notes', (req, res) => {
        fs.readFile('./db/db.json','utf8', (err, data) => {
            if (err) throw err;
            const noteData = JSON.parse(data);
            res.json(noteData); 
        })
       
    });
    

    app.post('/api/notes', (req, res) => {
        let newNote = req.body;
        console.log(newNote);
        fs.readFile('./db/db.json','utf8', (err, data) => {
            if (err) throw err;
            const allNotes = JSON.parse(data);
            newNote.id = uuidv4();
            console.log(newNote);
            allNotes.push(newNote);

            fs.writeFile('./db/db.json', JSON.stringify(allNotes), (err, data) => {
                if (err) throw err;
                res.json(allNotes);
            })
        })
    });

    app.delete('/api/notes/:id', (req, res) => {
        const id = req.params.id;
        const data = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"));
        const notes = data.filter((note) => note.id !== id);
        fs.writeFileSync('./db/db.json', JSON.stringify(notes), "utf-8");
        res.send("Note Removed");
    });
}