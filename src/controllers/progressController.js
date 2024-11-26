const { UserProgress, sequelize } = require('../models');
const { updateOrCreateStreak, checkAndUpdateUserLevel } = require('../services/progress/index');
const { successResponse, errorResponse } = require('../utils/responseConsistency'); // Import utility functions

/**
 * Handle PUT user progress (create or update progress)
 */
const putUserProgress = async (req, res) => {
    const transaction = await sequelize.transaction(); // Start transaction

    try {
        const { moduleId, levelId, score } = req.body;
        const userId = req.user.id;

        // Get all progress for the user in the given module
        const userProgressLevel = await UserProgress.findAll({
            where: { userId, moduleId },
            transaction,
        });

        // Find progress for the given levelId
        let userProgress = userProgressLevel.find((progress) => progress.levelId === levelId);

        if (userProgress) {
            // Update existing progress
            userProgress.score = score || userProgress.score;
            userProgress.completed = true;
            userProgress.lastAccessed = new Date();
            await userProgress.save({ transaction });

            // Prepare the success message
            message = 'Successful update user progress';
        } else {
            // Create new progress
            userProgress = await UserProgress.create(
                {
                    userId,
                    moduleId,
                    levelId,
                    completed: true,
                    lastAccessed: new Date(),
                    score,
                },
                { transaction }
            );

            // Prepare the success message
            message = 'Successful save user progress';
        }

        // Check and update user level if all levels in the module are completed
        await checkAndUpdateUserLevel(userId, moduleId, userProgressLevel, transaction);

        // Update or create streak
        await updateOrCreateStreak(userId, transaction);

        // Prepare response, excluding unnecessary fields
        const { user_id, level_id, module_id, ...response } = userProgress.toJSON();

        // Commit transaction
        await transaction.commit();

        // Send success response
        successResponse(res, response, message);

    } catch (error) {
        if (!transaction.finished) await transaction.rollback(); // Rollback on error
        console.error('Error processing user progress:', error);
        // Send error response
        errorResponse(res, error, 'Error processing user progress', 500);
    }
};

module.exports = { putUserProgress };
