
const express = require('express');
const router = express.Router();
const { getDailyTrivia } = require('../controllers/triviaController');
/**
 * @swagger
 * tags:
 *   name: Trivia
 *   description: Trivia management
 */

/**
 * @swagger
 * /trivia:
 *   get:
 *     summary: Get daily trivia
 *     tags: [Trivia]
 *     responses:
 *       200:
 *         description: A list of daily trivia
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                     description: The trivia title
 *                   description:
 *                     type: string
 *                     description: The trivia description
 *       500:
 *         description: Server error
 */



router.get('/', getDailyTrivia); // Route for getting list of folklore with optional search

module.exports=router