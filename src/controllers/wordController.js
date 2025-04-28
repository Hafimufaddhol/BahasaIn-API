const { Word,WordCategory,Sequelize  } = require('../models');
const { Op, Model, where } = require('sequelize'); // Sequelize operators
const { successResponse, errorResponse,paginatedResponse } = require('../utils/responseConsistency'); // Import utility functions


const getWord = async (req, res) => {
    const { page = 1, limit = 0, search = '', categories = '' } = req.query;

    try {
        // Prepare categories for filtering if provided
        let categoryFilter = {};
        if (categories) {
            categoryFilter = {
                category: {
                    [Op.in]: categories.split(',').map(category => category.trim()),
                },
            };
        }

        // Build query conditions
        const whereConditions = {
            word: {
                [Op.like]: `%${search}%`, // Search by word
            },
        };

        // Build query conditions for fetching data with pagination
        const fetchConditions = {
            where: whereConditions,
            include: [
                {
                    model: WordCategory,
                    required: !!categories, // Use INNER JOIN if categories are provided
                    where: categories ? categoryFilter : undefined,
                    attributes: [],
                },
            ],
            order: [['word', 'ASC']], // Order by word alphabetically
            offset: (page - 1) * limit, // For pagination
            distinct: true, // Ensure unique rows are returned
        };

        // req by md
        if (limit > 0) {
            fetchConditions.limit = parseInt(limit, 10); // Limit number of records per page
        }

        // Count the total number of records
        const total = await Word.count(fetchConditions);

        // Fetch the words from the database
        const words = await Word.findAll(fetchConditions);

        // Format the response
        const response = words.map(word => ({
            id: word.id,
            word: word.word,
        }));

        // Send the success response with pagination info
        paginatedResponse(res, response, 'Words fetched successfully', page, limit, total);
    } catch (error) {
        // Send error response in case of failure
        errorResponse(res, error.message, 'Error fetching data', 500);
    }
};




const getWordById = async (req, res) => {
    const { id } = req.params;

    try {
        let word;

        // Jika ID adalah 0, ambil data secara acak
        if (id == '0') {
            word = await Word.findOne({
                order: Sequelize.literal('RAND()'),
                include: [
                    {
                        model: WordCategory,
                    }
                ]
            });
        } else {
            // Ambil data berdasarkan ID
            word = await Word.findByPk(id, {
                include: [
                    {
                        model: WordCategory,
                    }
                ]
            });
        }

        // Periksa apakah data ditemukan
        if (!word) {
            return errorResponse(res, 'Word not found', 'No word found with the given ID', 404);
        }

        // Format respons
        const response = {
            id: word.id,
            word: word.word,
            categories: word.WordCategories.map(category => ({
                category: category.category,
                translate: category.translate,
                description: category.description,
                example: category.example,
            })), // assuming WordCategory is the association
        };

        // Kirim respons sukses
        successResponse(res, response, 'Word fetched successfully');
    } catch (error) {
        // Kirim respons kesalahan jika ada masalah
        errorResponse(res, error, 'Error fetching word', 500);
    }
};



module.exports = { getWord,getWordById };
