const { UserProgress, Module, Level, } = require('../models');
const { Op} = require('sequelize');

const getAllModule = async (userId,transaction) => {
    console.log('Fetching all modules for user:', userId);
    
    const modules=await Module.findAll({
        order: [['level', 'ASC']], // Urutkan berdasarkan level secara ascending
        where: {
            level: {
                [Op.gt]: 0, // Level module must be greater than 0
            },
        },
        include: [
            {
                model: Level, // Sertakan semua level terkait untuk setiap modul
                order: [['order', 'ASC']], // Urutkan level berdasarkan urutan (order)
                include: [
                    {
                        model: UserProgress,
                        where: { userId }, // Ambil hanya progres untuk pengguna tertentu
                        required: false, // Left join untuk memastikan level tanpa progres juga dimasukkan
                        attributes: ['id', 'completed', 'score'], // Ambil atribut yang relevan
                    },
                ],
            },
        ],
        transaction,
    });
    console.log('Total modules:', modules.length);
    

    if (!modules) {
        console.log('No modules found.');
        return [];
    }
    
    return modules
    
}
module.exports={getAllModule}