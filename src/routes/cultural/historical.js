const express = require('express');
const router = express.Router();
const {getHistorical,getHistoricalDetail}=require('../../controllers/cultural/historicalController')

/**
 * @swagger
 * tags:
 *   name: Historical
 *   description: API for retrieving historical information
 */

/**
 * @swagger
 *  /cultural/historical:
 *    get:
 *      summary: Get list of historical data
 *      description: Retrieve a list of historical data with optional search functionality.
 *      tags: [Historical]
 *      parameters:
 *        - name: search
 *          in: query
 *          description: Optional search term to filter historical data by title
 *          required: false
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: List of historical data fetched successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: integer
 *                      description: Historical data ID
 *                    title:
 *                      type: string
 *                      description: Title of the historical data
 *                    content:
 *                      type: string
 *                      description: Shortened preview of the content
 *                    imageUrl:
 *                      type: string
 *                      description: URL of the historical data cover image
 *        500:
 *          description: Error fetching historical data
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    description: Error message
 */


router.get('/',getHistorical);

/**
 * @swagger
 *  /cultural/historical/{id}:
 *    get:
 *      summary: Get detailed historical data by ID
 *      description: Retrieve detailed historical data by its ID.
 *      tags: [Historical]
 *      parameters:
 *        - name: id
 *          in: path
 *          description: The ID of the historical data to retrieve
 *          required: true
 *          schema:
 *            type: integer
 *      responses:
 *        200:
 *          description: Historical data details fetched successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  id:
 *                    type: integer
 *                    description: Historical data ID
 *                  title:
 *                    type: string
 *                    description: Title of the historical data
 *                  content:
 *                    type: string
 *                    description: Full content of the historical data
 *                  imageUrl:
 *                    type: string
 *                    description: URL of the historical data cover image
 *        404:
 *          description: Historical data not found
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    description: Error message
 *        500:
 *          description: Error fetching historical data details
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    description: Error message
 */


router.get('/:id',getHistoricalDetail);

module.exports=router