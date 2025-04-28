const express = require('express');
const router = express.Router();
const {getTranslate} = require('../controllers/translateController')
const { validateBody } = require('../middleware/validateBody');
/**
 * @swagger
 * /translate:
 *   post:
 *     summary: Translate text and get part of speech (POS) prediction
 *     description: This endpoint translates the given text and returns the translation along with the part of speech (POS) prediction.
 *     tags:
 *       - Translation
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - text
 *             properties:
 *               text:
 *                 type: string
 *                 description: The text to be translated.
 *                 example: "i want to eat"
 *     responses:
 *       200:
 *         description: Successful response with translation and POS prediction.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 translate:
 *                   type: string
 *                   description: The translated text.
 *                   example: "Hola, mundo!"
 *                 pos:
 *                   type: object
 *                   description: The part of speech (POS) prediction.
 *                   example: { "noun": ["world"], "verb": ["Hello"] }
 *       400:
 *         description: Bad request, invalid input.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: "Invalid input data"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: "Error fetching word"
 */



router.post('/',validateBody(['text']),getTranslate);

module.exports=router