const { Streak } = require('../models');
const { Op } = require('sequelize');
const moment = require('moment');

module.exports = async (req, res) => {
  const apiKey = req.headers['x-api-key'];

  // Validasi API key
  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(403).json({ message: 'Forbidden: Invalid API key' });
  }

  try {
    const todayUTC = moment.utc().startOf('day'); // Tanggal saat ini dalam UTC
    const yesterdayUTC = todayUTC.clone().subtract(1, 'days'); // Tanggal kemarin dalam UTC

    // Reset streak ke 0 untuk pengguna dengan `last_activity` bukan pada tanggal kemarin
    const updatedRows = await Streak.update(
      { streak: 0 }, // Set streak ke 0
      {
        where: {
          last_activity: { [Op.lt]: yesterdayUTC.toDate() }, // Jika last_activity sebelum kemarin
        },
      }
    );

    res.status(200).json({
      message: 'Streaks reset successfully',
      affectedRows: updatedRows[0], // Jumlah baris yang diperbarui
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error resetting streaks' });
  }
};
