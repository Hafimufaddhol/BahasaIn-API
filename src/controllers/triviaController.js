const { DailyTrivia,Sequelize } = require ('../models')
const { successResponse, errorResponse } = require('../utils/responseConsistency');

const getDailyTrivia = async (req, res) => {
    try {
        const dailyTrivia = await DailyTrivia.findOne({
            order: Sequelize.literal('RAND()'),
        });

        // Check if dailyTrivia is null or undefined
        if (!dailyTrivia) {
            return errorResponse(res, null, 'No daily trivia found');
        }
        const cleanData = dailyTrivia.dataValues; // Mengambil semua atribut

        return successResponse(res, cleanData, 'Daily trivia fetched successfully');
    } catch (error) {
        return errorResponse(res, error, 'Failed to fetch trivia');
    }
}


module.exports = {getDailyTrivia }