const jwt = require('jsonwebtoken');
const { Token } = require('../models');
const { Op } = require('sequelize');
const crypto = require('crypto');
const { json } = require('body-parser');
require('dotenv').config();

const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id, name: user.name ,level : user.userLevel }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const generateRefreshToken = async (user) => {
  const token = jwt.sign({ id: user.id,name : user.name }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: '30d',
  });
  await Token.destroy({
    where: {
      userId: user.id,
      type: 'refresh',
    },
  });
  await Token.create({
    userId:user.id,
    type: 'refresh',
    token,
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 7 hari
  });

  return token;
};
const generateResetToken = async (user) => {
  const userId=user.id
  const token = crypto.randomBytes(10).toString('hex');

  await Token.destroy({
    where: {
      userId,
      type: 'reset',
    },
  });
  await Token.create({
    userId,
    type: 'reset',
    token,
    expiresAt: new Date(Date.now() + 3600000), // 1 jam
  });

  return token;
};

const validateToken = async (token, type) => {
  const storedToken = await Token.findOne({
    where: {
      token,
      type,
      expiresAt: { [Op.gt]: new Date() }
    },
  });

  return storedToken ? storedToken.userId : null;
};
  

module.exports = { generateAccessToken, generateRefreshToken,validateToken,generateResetToken };
