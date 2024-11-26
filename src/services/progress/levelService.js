const { Level, User } = require('../../models');

/**
 * Check if all levels in a module are completed and update user level
 */
const checkAndUpdateUserLevel = async (userId, moduleId, userProgressLevel, transaction) => {
    const allLevels = await Level.findAll({
        where: { moduleId },
        attributes: ['id'],
        transaction,
    });
    const module = await Level.findOne({
        where: { id : moduleId },
        attributes: ['level'],
        transaction,
    });

    const completedLevels = userProgressLevel
        .filter((progress) => progress.completed)
        .map((progress) => progress.levelId);

    const allCompleted = allLevels.every((level) => completedLevels.includes(level.id));

    if (allCompleted) {
        const user = await User.findOne({ where: { id: userId }, transaction });
        if (user && user.userLevel<=module.level) {
            user.level += 1;
            await user.save({ transaction });
        }
    }
};

module.exports = { checkAndUpdateUserLevel };
