const { Recipe } = require ('../../models')
const { successResponse, errorResponse } = require('../../utils/responseConsistency');
const cheerio = require('cheerio');
const { Op } = require('sequelize');

const getRecipe = async (req, res) => {
    const { search = '' } = req.query;
    try {
        const RecipeData = await Recipe.findAll({
            where: {
                title: {
                    [Op.like]: `%${search}%`,
                },
            },
        });

        const result = RecipeData.map((item) => {
            
            const imageName = item.title.replace(/\s+/g, '_');

            const imageUrl = `${process.env.BUCKET_URL}/Recipe/${imageName}.png`;
            return {
                id:item.id,
                title:item.title,              
                imageUrl: imageUrl, // Dynamic image URL based on item.title
            };
        });

        return successResponse(res, result, 'Recipes fetched successfully');
    } catch (error) {
        return errorResponse(res, error, 'Error when fetching recipes', 500);
    }
};
const getRecipeDetail = async (req, res) => {
    const { id } = req.params; // Menggunakan req.params
    try {
        const RecipeDetail = await Recipe.findByPk(id);
        if (!RecipeDetail) {
            return errorResponse(res, null, 'Recipe detail not found', 404);
        }
        const imageName = RecipeDetail.title.replace(/\s+/g, '_');

        const imageUrl = `${process.env.BUCKET_URL}/Recipe/${imageName}.png`;
        const cleanData = RecipeDetail.dataValues; // Mengambil semua atribut

        const response ={
            ...cleanData,
            imageUrl
        }
        

        return successResponse(res, response, 'Recipe detail fetched successfully');
    } catch (error) {
        return errorResponse(res, error, 'Error when fetching Recipe Detail', 500);
    }
};


module.exports = {getRecipe, getRecipeDetail }