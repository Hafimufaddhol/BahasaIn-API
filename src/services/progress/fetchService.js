const { UserProgress, User, Module, Level } = require('../../models');

async function fetchUser(userId, transaction) {
    const user = await User.findByPk(userId, {
        attributes: ['id','userLevel', 'point'],
        transaction,
    });
    if (!user) {
        throw { statusCode: 404, message: 'User not found' };
    }
    return user;
}

async function fetchModule(moduleId, transaction) {
    const module = await Module.findByPk(moduleId, {
        attributes: ['level'],
        include: [{ model: Level, attributes: ['id'] }],
        transaction,
    });
    if (!module) {
        throw { statusCode: 404, message: 'Module not found' };
    }
    return module;
}

module.exports = {
    fetchUser,
    fetchModule,
};