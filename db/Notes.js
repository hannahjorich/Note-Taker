// Dependencies
// =============================================================
const util = require("util")
const fs = require("fs")
const { v4: uuidv4 } = require("uuid")
const readFileSync = util.promisify(fs.readFile)
const writeFileSync = util.promisify(fs.writeFile)

// ===============================================================================
// Data
// Below is an object constructor function that allows us to create, delete and see all our notes 
// ===============================================================================

class Notes{
    read(){
        return readFileSync("db/db.json", "utf8")
    }
    write(note){
        return writeFileSync("db/db.json", JSON.stringify(note))
    }
    getAllNotes(){
        return this.read().then(notes => {
            let readNotes;

            try {
                readNotes = [].concat(JSON.parse(notes))
            } catch (err) {
                readNotes = [];
            }
            return readNotes;
        })
    }
    addNote(note){
        const { title, text } = note;

        if (!title || !text) {
            throw new error("Note can not be blank")
        }
        const newNote = {
            title,
            text,
            id: uuidv4()
        }
        return this.getAllNotes().then(notes => [...notes, newNote]).then(updatedNotes => this.write(updatedNotes)).then(() => newNote)
    }
    removeNote(id) {
        return this.getAllNotes().then(notes => notes.filter((note) => note.id !== id)).then(filterNotes => this.write(filterNotes))
    }

}

//Here we are exporting the notes array which makes it accessbile to other files in this app 
module.exports = new Notes();