const express = require('express');
const router = express.Router();
const { getFolklore, getFolkloreDetail } = require('../../controllers/cultural/folkloreController');

/**
 * @swagger
 * tags:
 *   name: Folklore
 *   description: API for retrieving folklore information
 */

/**
 * @swagger
 *  /cultural/folklore:
 *    get:
 *      summary: Get list of folklore
 *      description: Retrieve a list of folklore with optional search functionality.
 *      tags: [Folklore]
 *      parameters:
 *        - name: search
 *          in: query
 *          description: Optional search term to filter folklore by title
 *          required: false
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: List of folklore fetched successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: integer
 *                      description: Folklore ID
 *                    title:
 *                      type: string
 *                      description: Title of the folklore
 *                    content:
 *                      type: string
 *                      description: Shortened preview of the content
 *                    imageUrl:
 *                      type: string
 *                      description: URL of the folklore cover image
 *        500:
 *          description: Error fetching folklore
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    description: Error message
 */

router.get('/', getFolklore); // Route for getting list of folklore with optional search

/**
 * @swagger
 *  /cultural/folklore/{id}:
 *    get:
 *      summary: Get detailed folklore by ID
 *      description: Retrieve detailed folklore information by its ID.
 *      tags: [Folklore]
 *      parameters:
 *        - name: id
 *          in: path
 *          description: The ID of the folklore to retrieve
 *          required: true
 *          schema:
 *            type: integer
 *      responses:
 *        200:
 *          description: Folklore details fetched successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  id:
 *                    type: integer
 *                    description: Folklore ID
 *                  title:
 *                    type: string
 *                    description: Title of the folklore
 *                  content:
 *                    type: string
 *                    description: Full content of the folklore
 *                  imageUrl:
 *                    type: string
 *                    description: URL of the folklore cover image
 *        404:
 *          description: Folklore detail not found
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    description: Error message
 *        500:
 *          description: Error fetching folklore details
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    description: Error message
 */

router.get('/:id', getFolkloreDetail); // Route for getting detailed folklore by ID

module.exports = router;
