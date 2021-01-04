const { Router } = require('express')

const router = Router()

const {
	renderSignUpForm,
	renderSigninForm,
	signin,
	signup,
	logout
} = require('../controller/user.controller')

router.get('/user/signup', renderSignUpForm)
router.post('/user/signup', signup)

router.get('/user/signin', renderSigninForm)
router.post('/user/signin', signin)

router.get('/user/logout', logout)


module.exports = router
