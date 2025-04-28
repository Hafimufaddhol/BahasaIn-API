const levelService = require('./levelService');
const streakService = require('./streakService');
const fetchService = require('./fetchService');
const updateOrCreateProgress = require('./updateOrCreateProgress')

async function validateAccess(userLevel, moduleLevel) {
    if (userLevel < moduleLevel) {
        throw {
            statusCode: 403,
            message: `Access denied. Required level: ${moduleLevel}, your level: ${userLevel}.`,
        };
    }
}


module.exports = {
    ...levelService,
    ...streakService,
    ...fetchService,
    ...updateOrCreateProgress,
    validateAccess
};
