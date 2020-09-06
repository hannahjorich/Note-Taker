// Loading Data 
// =============================================================
const Notes = require('../db/Notes')

// API GET Requests 
// =============================================================

module.exports = function(app){

    //need a app.get request 
    app.get("/api/notes", (req, res) => {
        Notes.getAllNotes().then(notes => res.json(notes)).catch(err => res.status(500).json(err)) 
    })

    app.post("/api/notes", (req, res) =>{
        Notes.addNote(req.body).then(note => res.json(note)).catch(err => res.status(500).json(err))
    })

    app.delete("/api/notes/:id", (req, res) =>{
        Notes.removeNote(req.params.id).then(() => res.json({ ok: true })).catch(err => res.status(500).json(err))
    })
}