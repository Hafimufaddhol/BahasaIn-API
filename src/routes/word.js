const express = require('express');
const router = express.Router();
const { getWord }= require ('../controllers/wordController')
const auth = require('../middleware/auth');

/**
 * @swagger
 * /words/:
 *   get:
 *     summary: Retrieve a list of words with optional filtering and pagination
 *     description: Fetches words based on search criteria, categories, and pagination.
 *     tags:
 *       - Words
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
 *         description: The number of words per page (default is 10).
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
 *           example: "apple"
 *       - name: categories
 *         in: query
 *         description: Comma-separated list of categories to filter words by (optional).
 *         required: false
 *         schema:
 *           type: string
 *           example: "fruit,food"
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

router.get('/',auth,getWord)

module.exports = router;