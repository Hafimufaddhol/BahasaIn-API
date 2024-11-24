const { UserProgress, Module, Level, Quiz, QuizOption, Sequelize, User } = require('../models');
const { Op, where } = require('sequelize');

// Fungsi untuk mendapatkan modul dengan level dan status penyelesaian
const getModules = async (req, res) => {
    const userId = req.user.id; // ID pengguna dari token

    try {
        // Ambil data pengguna berdasarkan ID
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(401).json({ error: 'User tidak ditemukan' });
        }

        // Ambil semua modul dari database
        const modules = await Module.findAll({
            order: [['level', 'ASC']],
            where: {
                level: {
                    [Op.gt]: 0, // Level module must be greater than 0
                },
            }, // Urutkan berdasarkan level secara ascending
            include: [
                {
                    model: Level, // Sertakan semua level terkait untuk setiap modul
                    order: [['order', 'ASC']], // Urutkan level berdasarkan urutan (order)
                    include: [
                        {
                            where: { userId }, // Ambil hanya progres untuk pengguna tertentu
                            required: false, // Left join untuk memastikan level tanpa progres juga dimasukkan
                            attributes: ['id', 'completed', 'score'], // Ambil atribut yang relevan
                        },
                    ],
                },
            ],
        });

        // Transformasikan data ke format respons yang diinginkan
        const response = modules.map((module) => {
            // Hitung jumlah level dan level yang telah diselesaikan pengguna
            const totalLevels = module.Levels.length;
            const completedLevels = module.Levels.filter(
                (level) => level.UserProgresses?.[0]?.completed
            ).length;

            return {
                id: module.id,
                name: module.name,
                level: module.level,
                isAccessible: user.level >= module.level, // Cek apakah modul dapat diakses
                lessonsCompleted: `${completedLevels}/${totalLevels}`, // Format penyelesaian modul
                levels: module.Levels.map((level) => ({
                    id: level.id,
                    title: level.title,
                    order: level.order,
                    score: level.UserProgresses?.[0]?.score || null, // Sertakan skor jika ada
                    isCompleted: !!level.UserProgresses?.[0]?.completed, // Boolean status penyelesaian
                })),
            };
        });

        // Kirim respons ke klien
        res.status(200).json({
            message : 'Successful get module',
            data: response,
        });
    } catch (error) {
        console.error('Error fetching modules and levels:', error);
        res.status(500).json({
            status: 'failed',
            message: 'Gagal mengambil data modul dan level',
        });
    }
};


const getLevel = async (req, res) => {
    const { moduleId, levelId } = req.params
    try {
        const levels = await Level.findAll({
            where : {
                moduleId : moduleId,
                id : levelId
            },
            order:[['order','ASC']],
            include : [
                {
                    model: Quiz,
                    include: [
                        {
                            model: QuizOption,
                        }
                    ]
                }
            ]
        })       
        if(!levels||levels.length<1){
            return res.status(401).json({ error: 'level tidak tersedia' })
        }
        const response = levels.map(level=>({
            id:level.id,
            title:level.title,
            quizzes : level.Quizzes.map(quiz=>({
                id : quiz.id,
                type : quiz.type,
                question : quiz.question,
                answer : quiz.answer,
                quizOption : quiz.QuizOptions.map(quizOption=>({
                    id:quizOption.id,
                    option : quizOption.option
                }))
            }))
        }))
        res.status(200).json(response)
    }catch(error){
        console.error('Error fetching level:', error);
        res.status(500).json({
            status: 'failed',
            message: 'Error fetching level content',
        });
    }
}



module.exports = { getModules, getLevel };
