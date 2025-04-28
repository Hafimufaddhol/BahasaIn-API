const { UserProgress, Module, Level, Quiz, QuizOption, Sequelize, User } = require('../models');
const { all } = require('../routes/profile');
const {getAllModule} = require('../services/getModule')
const { successResponse, errorResponse } = require('../utils/responseConsistency');

// Fungsi untuk mendapatkan modul dengan level dan status penyelesaian
const getModules = async (req, res) => {
    const userId = req.user.id; // ID pengguna dari token

    try {
        // Ambil data pengguna berdasarkan ID
        const user = await User.findByPk(userId);
        if (!user) {
            return errorResponse(res, 'User not found', 'User not found', 401);
        }
        if (!user.userLevel) {
            return errorResponse(res, 'User level not set', 'Access denied', 403);
        }

        // Ambil semua modul dari database
        const modules = await getAllModule(userId);

        // Transformasikan data ke format respons yang diinginkan
        let isPreviousModuleCompleted = true; // Status penyelesaian modul sebelumnya

        const response = modules.map((module) => {
            const { Levels = [] } = module;
            let isPreviousLevelCompleted = true; // Status penyelesaian level sebelumnya dalam modul

            const levels = Levels.map((level) => {
                const isLevelCompleted = !!level.UserProgresses?.[0]?.completed;
                const isLevelAccessible = isPreviousLevelCompleted && user.userLevel >= module.level && isPreviousModuleCompleted;


                isPreviousLevelCompleted = isLevelCompleted;

                return {
                    id: level.id,
                    moduleId: module.id,
                    isAccessible: isLevelAccessible,
                    title: level.title,
                    order: level.order,
                    score: level.UserProgresses?.[0]?.score || null,
                    isCompleted: isLevelCompleted,
                };
            });

            const completedLevels = levels.filter((l) => l.isCompleted).length;
            const isModuleAccessible = isPreviousModuleCompleted && user.userLevel >= module.level;

            isPreviousModuleCompleted = completedLevels === Levels.length; // Perbarui status modul sebelumnya

            return {
                id: module.id,
                name: module.name,
                level: module.level,
                isAccessible: isModuleAccessible,
                lessonsCompleted: `${completedLevels}/${Levels.length}`,
                levels,
            };
        });

        // Kirim respons ke klien menggunakan successResponse
        successResponse(res, response, 'Successfully retrieved modules');
    } catch (error) {
        console.error('Error fetching modules and levels:', error);
        errorResponse(res, error, 'Failed to fetch modules and levels', 500);
    }
};




const getLevel = async (req, res) => {
    const { moduleId, levelId } = req.params;
    const userId = req.user.id;

    try {
        // Fetch user level
        const user = await User.findByPk(userId, {
            attributes: ['userLevel'],
        });
        if (!user) {
            return errorResponse(res, 'User not found', 'User not found', 404);
        }
        const { userLevel } = user;

        // Fetch module level
        const module = await Module.findByPk(moduleId, {
            attributes: ['level'],
        });
        if (!module) {
            return errorResponse(res, 'Module not found', 'Module not found', 404);
        }
        const { level: moduleLevel } = module;

        // Check level access
        if (userLevel < moduleLevel) {
            return errorResponse(res, `Your level (${userLevel?? 0}) is not sufficient to access this module. Required level: ${moduleLevel}.`, 'Access denied', 403);
        }

        // Fetch levels with quizzes and options
        const levels = await Level.findAll({
            where: { moduleId, id: levelId },
            order: [['order', 'ASC']],
            include: [
                {
                    model: Quiz,
                    include: [{ model: QuizOption }],
                },
            ],
        });

        // Handle empty levels
        if (!levels || levels.length < 1) {
            return errorResponse(res, 'Level not available', 'Level not available', 404);
        }

        // Transform levels data into a cleaner response format
        const response = levels.map((level) => ({
            id: level.id,
            title: level.title,
            quizzes: level.Quizzes.map((quiz) => ({
                id: quiz.id,
                type: quiz.type,
                question: quiz.question,
                answer: quiz.answer,
                imageUrl: quiz.imageUrl,
                voiceUrl: quiz.voiceUrl,
                quizOptions: quiz.QuizOptions.map((quizOption) => ({
                    option: quizOption.option,
                })),
            })),
        }));

        // Send success response
        return successResponse(res, response, 'Level content fetched successfully');
    } catch (error) {
        console.error('Error fetching level:', error);
        return errorResponse(res, error.message || 'Internal Server Error', 'Error fetching level content', 500);
    }
};




module.exports = { getModules, getLevel };
