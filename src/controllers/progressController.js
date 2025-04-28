const { sequelize } = require('../models');
const {
    fetchUser,
    fetchModule,
    validateAccess,
    updateOrCreateProgress,
} = require('../services/progress/index');
const { updateOrCreateStreak, checkAndUpdateUserLevel } = require('../services/progress/index');
const { successResponse, errorResponse } = require('../utils/responseConsistency');
const {User,UserProgress} = require('../models')

const putUserProgress = async (req, res) => {
    const transaction = await sequelize.transaction();

    try {
        const { moduleId, levelId, score } = req.body;
        const userId = req.user.id;

        // Fetch and validate user
        const user = await fetchUser(userId, transaction);

        // Fetch and validate module
        const module = await fetchModule(moduleId, transaction);
        const levelExists = module.Levels.some((level) => level.id === levelId);
        if (!levelExists) {
            throw { statusCode: 404, message: `Level ID ${levelId} not found in module.` };
        }

        // Validate access
        await validateAccess(user.userLevel, module.level);

        // Update or create user progress
        const {userProgressReturn,message} = await updateOrCreateProgress({ user, moduleId, levelId, score }, transaction);

        // Check and update user level
        const levelUp = await checkAndUpdateUserLevel(user,moduleId,levelId,transaction);

        // Update or create streak
        await updateOrCreateStreak(userId, transaction);

        // Commit transaction
        await transaction.commit();

        // Send success response
        const { user_id, module_id, level_id, ...filteredResponse } = userProgressReturn.toJSON();
        successResponse(res, { ...filteredResponse, levelUp }, message);
        
    } catch (error) {
        if (!transaction.finished) await transaction.rollback();
        console.error('Error processing user progress:', error);

        const statusCode = error.statusCode || 500;
        const message = error.message || 'Internal Server Error';
        errorResponse(res, message, 'Error processing user progress', statusCode);
    }
};

const setUserLevel = async (req, res) => {
    try {
        const { level } = req.body;
        const userId = req.user.id;

        // Validate level
        if (level < 0 || level > 3) {
            return errorResponse(res, 'Invalid Level', 'Level must be between 0 and 10', 400);
        }

        const userLevel = level

        // Update user level
        const user = await User.findByPk(userId);
        if (user.userLevel !== null) {
            return errorResponse(res, 'Invalid operation', 'User level already set', 400);
        }
        user.userLevel = userLevel;
        await user.save();

        successResponse(res, {isNew:false}, 'User level successfully set.');
    } catch (error) {
        console.error('Error setting user level:', error);
        errorResponse(res, error.message, 'Error setting user level', 500);
    }
};

module.exports = { putUserProgress, setUserLevel };
