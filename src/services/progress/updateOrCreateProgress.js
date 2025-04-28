const { UserProgress } = require('../../models');


async function updateOrCreateProgress({ user, moduleId, levelId, score }, transaction) {
    const userId = user.id
    let userProgressReturn;
    let message;
    const userProgress = await UserProgress.findOne({
        where: { userId, moduleId, levelId },
        transaction,
    });
    if (userProgress) {
        if (score > userProgress.score) {
            const scoreIncrement = score - userProgress.score; // Hanya tambahkan selisih
            user.point = parseInt(user.point, 10) + scoreIncrement;
            await user.save({ transaction });
        }
        userProgress.score = Math.max(score, userProgress.score);
        userProgress.completed = true;
        userProgress.lastAccessed = new Date();

        await userProgress.save({ transaction });
        userProgressReturn = userProgress;
        message = "User progress updated successfully."
    } else {
        user.point = parseInt(user.point, 10) + score;
        await user.save({ transaction });
        userProgressReturn = await UserProgress.create(
            {
                userId,
                moduleId,
                levelId,
                score,
                completed: true,
                lastAccessed: new Date(),
            },
            { transaction }
        );

        message = "User progress save successfully."
    }
    return {
        userProgressReturn,
        message
    }
}

module.exports = {
    updateOrCreateProgress,
};