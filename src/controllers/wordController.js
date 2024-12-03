const { Word,WordCategory } = require('../models');
const { Op, Model, where } = require('sequelize'); // Sequelize operators
const { successResponse, errorResponse } = require('../utils/responseConsistency'); // Import utility functions


const getWord = async (req, res) => {
    const { page = 1, limit = 10, search = '', categories = '' } = req.query;

    try {
        // Prepare categories for filtering if provided
        let categoryFilter = {};
        if (categories) {
            // Split categories by commas and trim extra spaces
            categoryFilter = {
                category: {
                    [Op.in]: categories.split(',').map(category => category.trim())
                }
            };
        }

        // Build query conditions based on search and category filter
        const conditions = {
            where: {
                word: {
                    [Op.like]: `%${search}%`, // Search by word
                },

            },
            order: [['word', 'ASC']], 
            include: [
                {
                    model: WordCategory,
                    attributes:['category'],
                    where : {
                        ...categoryFilter
                    }
                }
            ],
            offset: (page - 1) * limit, // For pagination
            limit: parseInt(limit, 10),
        };

        // Fetch the words from the database
        const words = await Word.findAll(conditions);

        // Format the response
        const response = words.map(word => ({
            id: word.id,
            word: word.word,
        }));

        // Send the success response
        successResponse(res, response, 'Words fetched successfully');
    } catch (error) {
        // Send error response in case of failure
        errorResponse(res, error, 'Error fetching data', 500);
    }
};

module.exports = { getWord };
