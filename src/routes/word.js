const express = require('express');
const router = express.Router();
const { getWord, getWordById }= require ('../controllers/wordController')

/**
 * @swagger
 * /word/:
 *   get:
 *     summary: Retrieve a list of words with optional filtering and pagination
 *     description: Fetches words based on search criteria, categories, and pagination.
 *     tags:
 *       - Word
 *     parameters:
 *       - name: page
 *         in: query
 *         description: The page number for pagination (default is 1).
 *         required: false
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: limit
 *         in: query
 *         description: The number of words per page.
 *         required: false
 *         schema:
 *           type: integer
 *           example: 10
 *       - name: search
 *         in: query
 *         description: A search string to filter words (optional).
 *         required: false
 *         schema:
 *           type: string
 *       - name: categories
 *         in: query
 *         description: Comma-separated list of categories to filter words by (optional).
 *         required: false
 *         schema:
 *           type: string
 *           example: "noun,verb"
 *     responses:
 *       200:
 *         description: A list of words matching the search and category filters.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Words fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       word:
 *                         type: string
 *                         example: "apple"
 *                       category:
 *                         type: string
 *                         example: "fruit"
 *       400:
 *         description: Bad request, invalid parameters.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid parameters
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: failed
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */

router.get('/',getWord)

/**
 * @swagger
 * /word/{id}:
 *   get:
 *     summary: Get a word by ID
 *     tags: [Word]
 *     description: This endpoint allows you to fetch a word by its ID along with its associated category details.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the word to be fetched
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Word fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The word's ID
 *                 word:
 *                   type: string
 *                   description: The word
 *                 translate:
 *                   type: string
 *                   description: The translation of the word
 *                 category:
 *                   type: string
 *                   description: The category of the word
 *                 description:
 *                   type: string
 *                   description: The description of the word
 *                 example:
 *                   type: string
 *                   description: An example sentence with the word
 *       404:
 *         description: Word not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', getWordById);




module.exports = router;