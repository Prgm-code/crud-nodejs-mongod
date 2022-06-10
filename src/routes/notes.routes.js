const { Router } = require('express');
const router = Router();

const { renderNoteForm , 
        createNewNote, 
        renderNotes, 
        renderEditForm, 
        updateNote, 
        deleteNote
    } = require('../controllers/notes.controller');
const {isAuthenticated} = require('../helpers/auth');

//new note 
router.get('/notes/add',isAuthenticated, renderNoteForm );

router.post('/notes/new-note',isAuthenticated, createNewNote);

//get all node
router.get ('/notes',isAuthenticated, renderNotes);

// Edit Notes 
router.get('/notes/edit/:id' ,isAuthenticated, renderEditForm);

router.put('/notes/edit/:id',isAuthenticated,   updateNote);

//delete Notes 
router.delete('/notes/delete/:id',isAuthenticated, deleteNote );


module.exports = router