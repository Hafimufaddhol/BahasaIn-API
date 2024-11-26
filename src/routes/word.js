const express = require('express');
const router = express.Router();
const { getWord }= require ('../controllers/wordController')
const auth = require('../middleware/auth');


router.get('/',auth,getWord)

module.exports = router;