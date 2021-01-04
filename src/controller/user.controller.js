const userCtrl = {}
const User = require('../models/User')
const passport = require('passport')

userCtrl.renderSignUpForm = (req, res) => {
	res.render('user/signup')
}

userCtrl.signup = async (req,res) => {
	const errors = []
	const {email, name, password, confirm_password} = req.body;

	if(password != confirm_password){
		errors.push({text: 'password do not match'})
	}
	if(password.length < 4){
		errors.push({text: 'password must be at least 4 characters'})
	}
	if(errors.length > 0){
		res.render('user/signup', {
			errors,
			name,
			email,
			password,
			confirm_password
		})
	}else{
		const emailUser = await User.findOne({email: email})
		
		if(emailUser){
			req.flash('error_msg', 'email is already in use')
			res.redirect('/user/signup')
		}else{
			const newUser = new User({name, email, password})
			newUser.password = await newUser.encryptPassword(password)
			await newUser.save()
			req.flash('success_msg', 'You are registed')
			res.redirect('/user/signin')
		}
	}
}

userCtrl.renderSigninForm = (req, res) => {
	res.render('user/signin')
}

userCtrl.signin = passport.authenticate('local', {
	failureRedirect: '/user/signin',
	successRedirect: '/notes',
	failureFlash: true
})

userCtrl.logout = (req, res) => {
	req.logout()
	req.flash('success_msg', 'You are logged out now')
	res.redirect('/user/signin')
}

module.exports = userCtrl
