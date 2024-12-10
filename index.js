const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.listen(port, () => {
    console.log(`Serveur lancé sur le port ${port}`);
});

// Classe pour représenter une note
class Note {
    constructor(id, title, content) {
        this.id = id;
        this.title = title;
        this.content = content;
    }
}

// Simuler le stockage local avec un tableau en mémoire
let notes = [
    new Note(1, "Bienvenue", "Ceci est votre première note"),
    new Note(2, "Tâches à faire", "Apprendre Express.js")
];

// Récupérer toutes les notes
app.get("/notes", (req, res) => {
    res.status(200).json(notes);
});

// Récupérer une note par ID
app.get("/notes/:id", (req, res) => {
    const noteId = parseInt(req.params.id);
    const note = notes.find((n) => n.id === noteId);
    if (!note) {
        res.status(404).json({ error: "Note non trouvée" });
    } else {
        res.status(200).json(note);
    }
});

// Ajouter une nouvelle note
app.post("/notes", (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({ error: "Titre et contenu sont requis" });
    }
    const newNote = new Note(notes.length + 1, title, content);
    notes.push(newNote);
    res.status(201).json(newNote);
});

// Modifier une note existante
app.put("/notes/:id", (req, res) => {
    const noteId = parseInt(req.params.id);
    const { title, content } = req.body;
    const noteIndex = notes.findIndex((n) => n.id === noteId);
    if (noteIndex === -1) {
        return res.status(404).json({ error: "Note non trouvée" });
    }
    if (title) notes[noteIndex].title = title;
    if (content) notes[noteIndex].content = content;
    res.status(200).json(notes[noteIndex]);
});

// Supprimer une note
app.delete("/notes/:id", (req, res) => {
    const noteId = parseInt(req.params.id);
    notes = notes.filter((n) => n.id !== noteId);
    res.status(200).json({ message: "Note supprimée avec succès" });
});
