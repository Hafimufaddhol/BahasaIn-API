const { successResponse, errorResponse } = require('../utils/responseConsistency'); // Import utility functions
const { User } = require('../models'); // Import User model

// Controller function to handle user settings
const setting = async (req, res) => {
    try {
        const  userId  = req.user.id; // Assuming `req.user` contains authenticated user info
        const { notificationPreference, avatar } = req.body;
        

        // Update notification preference if provided
        if (notificationPreference !== undefined) {
            await setUserNotif(userId, notificationPreference);
        }

        // Update avatar if provided
        if (avatar) {
            await setUserAvatar(userId, avatar);
        }

        successResponse(res, {}, 'User settings updated successfully',200);
    } catch (error) {
        console.error('Error in updating user settings:', error);
        errorResponse(res, error.message || 'Internal Server Error', 'fail when updating user setting', 500);
    }
};

// Function to update user's notification preference
const setUserNotif = async (userId, notif) => {
    const user = await User.findByPk(userId); // Correct method name is `findByPk`
    if (!user) {
        throw new Error('User not found');
    }

    user.notificationPreference = notif;
    await user.save(); // Save changes to the database
};

// Function to update user's avatar
const setUserAvatar = async (userId, avatar) => {
    const user = await User.findByPk(userId); // Correct method name is `findByPk`
    if (!user) {
        throw new Error('User not found');
    }

    user.avatar = avatar; // Assuming there is an `avatar` column in the `users` table
    await user.save(); // Save changes to the database
};

module.exports = {
    setting,
};
