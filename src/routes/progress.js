const express = require('express');
const router = express.Router();
const {putUserProgress} = require('../controllers/progressController')
const { validateBody } = require('../middleware/validateBody');

/**
 * @swagger
 * /progress/:
 *   put:
 *     summary: Create or update user progress
 *     description: Create a new progress entry or update an existing one for a user based on module and level.
 *     tags:
 *       - Progress
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               moduleId:
 *                 type: integer
 *                 example: 1
 *                 description: The ID of the module.
 *               levelId:
 *                 type: integer
 *                 example: 2
 *                 description: The ID of the level.
 *               score:
 *                 type: integer
 *                 example: 90
 *                 description: The user's score for the level.
 *     responses:
 *       200:
 *         description: User progress saved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User progress saved successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 18
 *                     userId:
 *                       type: string
 *                       example: "MuGVshUJhD"
 *                     moduleId:
 *                       type: integer
 *                       example: 1
 *                     levelId:
 *                       type: integer
 *                       example: 2
 *                     completed:
 *                       type: boolean
 *                       example: true
 *                     lastAccessed:
 *                       type: string
 *                       example: "2024-11-22T12:34:56Z"
 *                     score:
 *                       type: integer
 *                       example: 90
 *                 streak:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: string
 *                       example: "MuGVshUJhD"
 *                     streak:
 *                       type: integer
 *                       example: 5
 *                     lastActivity:
 *                       type: string
 *                       example: "2024-11-22T12:34:56Z"
 *       400:
 *         description: Bad request or duplicate progress.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid input or user progress already exists
 *       404:
 *         description: User progress not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: User progress not found
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


router.put('/',validateBody(['moduleId','levelId','score']),putUserProgress);



module.exports = router;