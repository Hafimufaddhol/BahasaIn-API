
const express = require('express');
const router = express.Router();
const {getHead,getProfile}=require('../controllers/profileController')
/**
 * @swagger
 * /profile/head:
 *   get:
 *     summary: Retrieve the head profile information
 *     description: Fetches the user's point and streak information.
 *     tags:
 *       - Profile
 *     responses:
 *       200:
 *         description: Head fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 point:
 *                   type: integer
 *                   description: The user's points
 *                   example: 100
 *                 streak:
 *                   type: integer
 *                   description: The user's streak
 *                   example: 5
 *       500:
 *         description: Failed to fetch head
 */

router.get('/head',getHead)


/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Retrieve the user's profile information
 *     description: Fetches the user's profile including name, avatar, level, notification preferences, completion percentage, and certificate links.
 *     tags:
 *       - Profile
 *     responses:
 *       200:
 *         description: Profile fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   description: The user's name
 *                   example: John Doe
 *                 avatar:
 *                   type: string
 *                   description: The URL of the user's avatar
 *                   example: https://example.com/Avatar/johndoe.png
 *                 level:
 *                   type: integer
 *                   description: The user's level
 *                   example: 3
 *                 notif:
 *                   type: boolean
 *                   description: The user's notification preference
 *                   example: true
 *                 percent:
 *                   type: number
 *                   format: float
 *                   description: The percentage of modules completed by the user
 *                   example: 75.00
 *                 certiLink:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: The links to the certificates for completed modules
 *                   example: ["https://example.com/Certificate/module1.png", "https://example.com/Certificate/module2.png"]
 *       500:
 *         description: Failed to fetch profile
 */
router.get('/',getProfile)

module.exports = router