const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const user = require('../models/User')


passport.use(new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password'
}, async (email, password, done) => {
	//match email
	const User = await user.findOne({email})
	if(!User){
		return done(null, false, {message: 'Not user found'})
	}else{
		const match = await User.matchPassword(password)
		if(match){
			return done(null, User)
		}else{
			return done(null, false, {message: 'Incorrect password'})
		}
	}
}))

passport.serializeUser((user, done) =>{
	done(null, user.id)
})

passport.deserializeUser((id, done) => {
	user.findById(id, (err, user) =>{
		done(err, user)
	})
})

