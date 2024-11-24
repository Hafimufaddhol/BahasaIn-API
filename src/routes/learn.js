const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const {getModules,getLevel} = require('../controllers/learnController')


/**
 * @swagger
 * /module/:
 *   get:
 *     summary: Retrieve all modules
 *     description: Get a list of all modules along with their levels and completion status.
 *     tags:
 *       - Modules
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of modules with their levels.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 module:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "suffragium"
 *                       level:
 *                         type: integer
 *                         example: 1
 *                       levels:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                               example: 1
 *                             title:
 *                               type: string
 *                               example: "tergeo"
 *                             complete:
 *                               type: boolean
 *                               example: false
 */
router.get('/', getModules);


/**
 * @swagger
 * /module/{moduleId}/level/{levelId}:
 *   get:
 *     summary: Retrieve details of a specific level
 *     description: Get details of a specific level, including its content and quizzes.
 *     tags:
 *       - Modules
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: moduleId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the module.
 *       - in: path
 *         name: levelId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the level.
 *     responses:
 *       200:
 *         description: Details of the level.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 level:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     title:
 *                       type: string
 *                       example: "Level Title"
 *                     content:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           content_en:
 *                             type: string
 *                             example: "English content"
 *                           content_id:
 *                             type: string
 *                             example: "Content in another language"
 *                           sequence:
 *                             type: string
 *                             example: "1"
 *                           transliteration:
 *                             type: string
 *                             example: "Transliteration text"
 *                           category:
 *                             type: string
 *                             example: "Category type"
 *                     quiz:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           question:
 *                             type: string
 *                             example: "What is the capital of France?"
 *                           answer:
 *                             type: string
 *                             example: "Paris"
 *                           explanation:
 *                             type: string
 *                             example: "Paris is the capital of France."
 *                           quizOption:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 id:
 *                                   type: integer
 *                                   example: 1
 *                                 option:
 *                                   type: string
 *                                   example: "Paris"
 */
router.get('/:moduleId/level/:levelId',getLevel)

module.exports = router;