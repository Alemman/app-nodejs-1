const notesCtrl = {}

const Note = require('../models/Notes')


notesCtrl.renderNoteForm = (req,res) =>{
	res.render('notes/new-notes')
}

notesCtrl.createNewNote = async (req,res) =>{
	const {title, description} = req.body
	const newNote = new Note({title,description})
	newNote.user = req.user.id
	await newNote.save()
	req.flash('success_msg', 'note added successfully')
	res.redirect('/notes')
}

notesCtrl.renderNotes = async (req,res) => {
	const notes = await Note.find({user: req.user.id }).sort({createdAt: 'desc'}).lean()
/*        .exec(function (error,body) {
                res.render('notes/all-notes', { notes})
        })*/
   

//	const notes = await Note.find()
	res.render('notes/all-notes', {notes})

}

notesCtrl.renderEditForm = async (req,res) => {
	const note = await Note.findById(req.params.id).lean()
	if(note.user != req.user.id){
		req.flash('error_msg', 'Not Authorized')
		return res.redirect('/notes')
	}
	res.render('notes/edit-note', { note })
}

notesCtrl.updateForm = async (req,res) => {
	const {title, description} = req.body
	await Note.findByIdAndUpdate(req.params.id, {title, description})
	req.flash('success_msg', 'note updated successfully')
	res.redirect('/notes')
}

notesCtrl.deleteNote = async (req,res) => {
	await Note.findByIdAndDelete(req.params.id)
	req.flash('success_msg', 'note deleted successfully')
	res.redirect('/notes')
}



module.exports = notesCtrl
