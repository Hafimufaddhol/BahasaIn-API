const express = require('express');
const router = express.Router();
const path = require('path');
const { register, login, refresh, logout, requestResetPassword, resetPassword } = require('../controllers/authController');
const { validateBody } = require('../middleware/validateBody');
const auth = require('../middleware/auth')

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication APIs
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     description: This endpoint allows a user to register with name, email, and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's name
 *                 example: johndoe
 *               email:
 *                 type: string
 *                 description: The user's email address
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 description: The user's password
 *                 example: P@ssw0rd
 *               confirmPassword:
 *                 type: string
 *                 description: The user's password confirmation
 *                 example: P@ssw0rd
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 */
router.post('/register', validateBody(['name', 'email', 'password', 'confirmPassword']), register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     description: This endpoint allows a user to log in with email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email address
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 description: The user's password
 *                 example: P@ssw0rd
 *     responses:
 *       200:
 *         description: Login successful, returns access and refresh tokens
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   description: Access token for the user
 *                 refreshToken:
 *                   type: string
 *                   description: Refresh token for the user
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', validateBody(['email', 'password']), login);

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: Refresh access token
 *     tags: [Auth]
 *     description: This endpoint refreshes the access token using a valid refresh token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 description: The refresh token
 *                 example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 *     responses:
 *       200:
 *         description: New access token generated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   description: New access token
 *       403:
 *         description: Invalid or expired refresh token
 */
router.post('/refresh', validateBody(['refreshToken']), refresh);

/**
 * @swagger
 * /auth/request-reset-password:
 *   post:
 *     summary: Request password reset email
 *     tags: [Auth]
 *     description: This endpoint allows the user to request a password reset email by providing the user's email.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email address to send the reset link
 *                 example: johndoe@example.com
 *     responses:
 *       200:
 *         description: Reset password email sent successfully
 *       400:
 *         description: Invalid or non-existent email address
 *       500:
 *         description: Internal server error
 */
router.post('/request-reset-password', validateBody(['email']), requestResetPassword);

/**
 * @swagger
 * /auth/reset-password/{token}:
 *   post:
 *     summary: Reset password using token
 *     tags: [Auth]
 *     description: This endpoint allows a user to reset their password by providing a valid reset token and new password.
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         description: The reset token from the password reset email
 *         schema:
 *           type: string
 *           example: abc123resetToken
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 description: The new password for the user
 *                 example: NewP@ssw0rd123
 *               confirmPassword:
 *                 type: string
 *                 description: Confirmation of the new password to ensure accuracy
 *                 example: NewP@ssw0rd123
 *     responses:
 *       200:
 *         description: Password successfully reset
 *       400:
 *         description: Invalid token or password mismatch
 *       401:
 *         description: Invalid or expired token
 *       500:
 *         description: Internal server error
 */
router.post('/reset-password/:token', validateBody(['password', 'confirmPassword']), resetPassword);

/**
 * @swagger
 * /auth/logout:
 *   delete:
 *     summary: Logout user
 *     tags: [Auth]
 *     description: This endpoint allows a user to logout by removing their refresh token.
 *     responses:
 *       200:
 *         description: Logout successful
 *       400:
 *         description: Refresh token is required for logout
 *       404:
 *         description: Token not found or already deleted
 *       500:
 *         description: Internal server error
 */
router.delete('/logout', auth, logout);

module.exports = router;
