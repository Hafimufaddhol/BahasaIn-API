const { Level, Module, User, UserProgress } = require('../../models');
const { getAllModule } = require('../getModule');

/**
 * Cek dan update level user jika semua level pada modul diselesaikan
 */
const checkAndUpdateUserLevel = async (user,moduleId,levelId, transaction) => {
    try {

        console.log('User level before update:', user.userLevel);

        // Ambil semua modul dan level berdasarkan userId
        const modules = await getAllModule(user.id);

        // Filter modul yang berada di level pengguna saat ini
        const modulesAtUserLevel = modules.filter(module => module.level === user.userLevel);

        if (!modulesAtUserLevel.length) {
            console.log('No modules found for the user level.');
            return false;
        }

        // Cek apakah semua level dalam modul-modul tersebut selesai
        let allModulesCompleted = true;

        for (const module of modulesAtUserLevel) {
            const { Levels = [] } = module;

            // Ambil ID semua level di modul ini
            const levelIds = Levels.map(level => level.id);

            console.log(`Levels in module ${module.name}:`, levelIds);

            // Periksa apakah semua level di modul ini selesai
            const completedLevels = Levels.filter(
                level => level.UserProgresses?.[0]?.completed
            ).map(level => level.id);
            if(module.id===moduleId){
                completedLevels.push(levelId)
            }
            
            const allLevelsCompleted = levelIds.every(id => completedLevels.includes(id));

            if (!allLevelsCompleted) {
                allModulesCompleted = false;
                console.log(`Not all levels completed in module ${module.name}`);
                break;
            }
        }

        // Jika semua modul selesai, naikkan level pengguna
        if (allModulesCompleted) {
            user.userLevel += 1;
            await user.save({ transaction });
            console.log('User level after update:', user.userLevel);
            return true;
        }

        console.log('Not all modules at this level are completed.');
        return false;

    } catch (error) {
        console.error('Error in checkAndUpdateUserLevel:', error);
        throw error;
    }
};



module.exports = { checkAndUpdateUserLevel };
