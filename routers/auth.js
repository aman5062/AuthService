const router = require('express').Router()
const authController = require('../controllers/auth')
const auth = require('../middlewares/auth')

router.post("/login",authController.login)
router.post("/register",authController.signup)
router.post("/refresh",authController.refresh)
router.post("/logout",authController.logout)
router.get("/me",auth,authController.getMe)


module.exports = router;