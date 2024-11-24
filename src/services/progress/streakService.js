const { Streak } = require('../../models');
const moment = require('moment-timezone');

/**
 * Update or create streaks for a user
 */
const updateOrCreateStreak = async (userId, transaction, userTimezone = 'UTC') => {
    const existingStreak = await Streak.findOne({ where: { userId }, transaction });

    const currentDateUTC = moment.utc();
    const currentDate = currentDateUTC.tz(userTimezone);
    const currentDay = currentDate.startOf('day');

    if (existingStreak) {
        const lastActivityUTC = moment.utc(existingStreak.lastActivity);
        const lastActivityDate = lastActivityUTC.tz(userTimezone);
        const lastActivityDay = lastActivityDate.startOf('day');

        const dayDifference = currentDay.diff(lastActivityDay, 'days');

        if (dayDifference === 1) {
            existingStreak.streak += 1;
        } else if (dayDifference > 1) {
            existingStreak.streak = 1;
        }

        existingStreak.lastActivity = currentDateUTC.toDate();
        await existingStreak.save({ transaction });
        return existingStreak;
    } else {
        const newStreak = await Streak.create(
            {
                userId,
                streak: 1,
                lastActivity: currentDateUTC.toDate(),
            },
            { transaction }
        );
        return newStreak;
    }
};

module.exports = { updateOrCreateStreak };
