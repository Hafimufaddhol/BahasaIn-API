const express = require('express');
const router = express.Router();
const {getRecipe,getRecipeDetail}=require('../../controllers/cultural/recipeController')

/**
 * @swagger
 * tags:
 *   name: Recipe
 *   description: API for retrieving recipe information
 */

/**
 * @swagger
 *  /cultural/recipe:
 *    get:
 *      summary: Get list of recipes
 *      description: Retrieve a list of recipes with optional search functionality.
 *      tags: [Recipe]
 *      parameters:
 *        - name: search
 *          in: query
 *          description: Optional search term to filter recipes by title
 *          required: false
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: List of recipes fetched successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: integer
 *                      description: Recipe ID
 *                    title:
 *                      type: string
 *                      description: Title of the recipe
 *                    imageUrl:
 *                      type: string
 *                      description: URL of the recipe cover image
 *        500:
 *          description: Error fetching recipes
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    description: Error message
 */



router.get('/',getRecipe);

/**
 * @swagger
 *  /cultural/recipe/{id}:
 *    get:
 *      summary: Get detailed recipe by ID
 *      description: Retrieve detailed recipe information by its ID.
 *      tags: [Recipe]
 *      parameters:
 *        - name: id
 *          in: path
 *          description: The ID of the recipe to retrieve
 *          required: true
 *          schema:
 *            type: integer
 *      responses:
 *        200:
 *          description: Recipe details fetched successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  id:
 *                    type: integer
 *                    description: Recipe ID
 *                  title:
 *                    type: string
 *                    description: Title of the recipe
 *                  content:
 *                    type: string
 *                    description: Full content or description of the recipe
 *                  imageUrl:
 *                    type: string
 *                    description: URL of the recipe cover image
 *        404:
 *          description: Recipe detail not found
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    description: Error message
 *        500:
 *          description: Error fetching recipe details
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    description: Error message
 */
router.get('/:id',getRecipeDetail);

module.exports=router
