const {Router} = require('express')

const router = Router()
const {
	renderNoteForm, 
	createNewNote, 
	renderNotes, 
	renderEditForm, 
	updateForm, 
	deleteNote
} = require('../controller/notes.controller')
const {isAuthenticated} = require('../helpers/auth')

//New Note
router.get('/notes/add',isAuthenticated, renderNoteForm)
router.post('/notes/add', isAuthenticated, createNewNote)

//All notes
router.get('/notes', isAuthenticated, renderNotes)

//Edit notes
router.get('/notes/edit/:id', isAuthenticated, renderEditForm)
router.put('/notes/edit/:id', isAuthenticated, updateForm)

//Delete notes
router.delete('/notes/delete/:id', isAuthenticated, deleteNote)



module.exports = router
