const levelService = require('./levelService');
const streakService = require('./streakService');

module.exports = {
    ...levelService,
    ...streakService,
};
