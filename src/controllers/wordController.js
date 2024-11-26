const { Word } = require('../models');
const { Op } = require('sequelize'); // Sequelize operators

const getWord= async (req,res)=>{
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
            [Op.like]: `%${search}%`, // search by word
          },
          ...categoryFilter
        },
        offset: (page - 1) * limit, // For pagination
        limit: parseInt(limit, 10),
      };
  
      // Fetch the words from the database
      const words = await Word.findAll(conditions);

      const reponse = words.map(word=>({
            id:word.id,
            word: word.word,
            category : word.category,
      }))
  
      // Send the response
      res.json({
        page,
        limit,
        reponse,
      });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching data', error });
    }
}

module.exports = { getWord };