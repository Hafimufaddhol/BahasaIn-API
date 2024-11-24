const { UserProgress, sequelize } = require('../models');
const { updateOrCreateStreak,checkAndUpdateUserLevel } = require('../services/progress/index');

/**
 * Handle PUT user progress (create or update progress)
 */
const putUserProgress = async (req, res) => {
    const transaction = await sequelize.transaction(); // Start transaction
    let message;

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
            message = 'Successful update user progress';
            userProgress.score = score || userProgress.score;
            userProgress.completed = true;
            userProgress.lastAccessed = new Date();
            await userProgress.save({ transaction });
        } else {
            // Create new progress
            message = 'Successful save user progress';
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
        }

        // Check and update user level if all levels in the module are completed
        await checkAndUpdateUserLevel(userId, moduleId, userProgressLevel, transaction);

        // Update or create streak
        await updateOrCreateStreak(userId, transaction);

        // Prepare response
        const { user_id, level_id, module_id, ...response } = userProgress.toJSON();

        // Commit transaction
        await transaction.commit();

        return res.status(201).json({
            message,
            data: response,
        });
    } catch (error) {
        if (!transaction.finished) await transaction.rollback(); // Rollback on error
        console.error('Error processing user progress:', error);
        return res.status(500).json({
            status: 'failed',
            message: error.message || 'Internal server error',
        });
    }
};

module.exports = { putUserProgress };
