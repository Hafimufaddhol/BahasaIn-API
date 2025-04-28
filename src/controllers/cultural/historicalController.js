const { Historical } = require('../../models')
const { successResponse, errorResponse } = require('../../utils/responseConsistency');
const cheerio = require('cheerio');
const { Op } = require('sequelize');


const getHistorical = async (req, res) => {
    const { search = '' } = req.query;
    try {
        const HistoricalData = await Historical.findAll({
            where: {
                title: {
                    [Op.like]: `%${search}%`,
                },
            },
        });
        

        const result = HistoricalData.map((item) => {
            const plainTextContent = cheerio.load(item.content).text();

            const words = plainTextContent.split(/\s+/);
            const overview = words.slice(0, 30).join(' ');

            const imageName = item.title.replace(/\s+/g, '_');

            const imageUrl = `${process.env.BUCKET_URL}/Historical/${encodeURIComponent(item.title)}/${imageName}.png`;

            return {
                ...item.toJSON(),
                imageUrl: imageUrl, // Dynamic image URL based on item.title
                content: overview, // Shortened content preview
            };
        });

        return successResponse(res, result, 'Historical fetch successfully');
    } catch (error) {
        return errorResponse(res, error, 'Error when fetching Historical', 500);
    }
};


const getHistoricalDetail = async (req, res) => {
    const { id } = req.params; // Perbaikan: Menggunakan req.params
    try {
        const HistoricalDetail = await Historical.findByPk(id);
        if (!HistoricalDetail) {
            return errorResponse(res, null, 'Historical detail not found', 404);
        }
        const cleanData = HistoricalDetail.dataValues;

        return successResponse(res, cleanData, 'Historical detail fetched successfully');
    } catch (error) {
        return errorResponse(res, null, 'Error when fetching Historical Detail', 500);
    }
};

module.exports = { getHistorical, getHistoricalDetail }