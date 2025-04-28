const express = require('express');
const router = express.Router();

const historicalRoutes = require('./historical')
const folkloreRoutes = require('./folklore')
const recipeRoutes = require('./recipe')


router.use('/historical',historicalRoutes);
router.use('/folklore',folkloreRoutes)
router.use('/recipe',recipeRoutes)


module.exports=router

