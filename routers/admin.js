const router = require('express').Router()
const adminController = require('../controllers/admin')

router.get("/config",adminController.getConfig)
router.put("/config",adminController.updateConfig)
router.get("/logs",adminController.getLogs)
router.get("/sessions",adminController.getSessions)
router.post("/role",adminController.setRole)


module.exports = router;