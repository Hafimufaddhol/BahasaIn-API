const bcrypt = require('bcrypt');
const { User,Streak, Token } = require('../models');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { generateAccessToken, generateRefreshToken, generateResetToken, validateToken } = require('../utils/tokenHelper');
const { sendEmail } = require('../utils/sendEmail');
const { validatePassword } = require('../utils/validatePassword');
const { successResponse, errorResponse, paginatedResponse } = require('../utils/responseConsistency');
const { error } = require('console');
const { Model } = require('sequelize');



const register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    const error = validatePassword(password, confirmPassword);

    if (error.length > 0) {
      return errorResponse(res, error, 'Password validation failed', 400);
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({ name, email, password: hashedPassword });

    // Remove password from response
    const { password: _, ...userResponse } = user.toJSON();

    successResponse(res, userResponse, 'User registered successfully', 201);
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      return errorResponse(res, err, 'Email is already in use', 400);
    }
    errorResponse(res, err, 'Failed to register user', 400);
  }
};



const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: { email },
      include: [{ model: Streak }]
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return errorResponse(res, 'Invalid credentials', 'Authentication failed', 401);
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = await generateRefreshToken(user);

    successResponse(res, { accessToken, refreshToken }, 'Login successful');
  } catch (err) {
    errorResponse(res, err, 'Server error', 500);
  }
};



const refresh = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return errorResponse(res, 'Refresh token is required', 'Token missing', 403);
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const userId = await validateToken(refreshToken, 'refresh');

    

    if (!userId) {
      return errorResponse(res, 'Invalid refresh Token', 'Invalid refresh token', 403);
    }
    const user = await User.findByPk(userId);
    

    const newAccessToken = generateAccessToken(user);
    successResponse(res, { accessToken: newAccessToken }, 'Access token refreshed successfully');
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      console.error('Token expired at:', err.expiredAt);
      return errorResponse(res, 'Refresh token expired', 'Refresh token expired', 403);
    }
    console.error('JWT Verification Error:', err.message);
    return errorResponse(res, 'Invalid refresh Token', 'Invalid refresh token', 403);
  }
};


const requestResetPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return errorResponse(res, 'Email not found', 'Email not registered', 404);
    }

    // Generate reset token
    const resetToken = await generateResetToken(user);

    // Send password reset email
    await sendEmail({
      to: user.email,
      token: resetToken,
    });

    successResponse(res, {}, 'Password reset email sent successfully');
  } catch (err) {
    console.error(err);
    errorResponse(res, 'Server error', 'An error occurred on the server', 500);
  }
};


const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password, confirmPassword } = req.body;

  const error = validatePassword(password, confirmPassword);
  if (error.length > 0) {
    return errorResponse(res, error, 'Password validation failed', 400);
  }

  try {
    const userId = await validateToken(token, 'reset');
    if (!userId) {
      return errorResponse(res, 'Invalid token', 'Token is invalid', 404);
    }

    // Update password
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.update({ password: hashedPassword }, { where: { id: userId } });
    await Token.destroy({ where: { token, type: 'reset' } });

    successResponse(res, {}, 'Password reset successfully');
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return errorResponse(res, 'Token expired', 'Reset token expired', 400);
    }
    errorResponse(res, err, 'Invalid token', 400);
  }
};


const logout = async (req, res) => {
  const userId= req.user.id;

  try {
    const deletedToken = await Token.destroy({
      where: { userId: userId, type: 'refresh' },
    });

    if (!deletedToken) {
      return errorResponse(res, 'Token not found or already deleted', 'Token not found', 404);
    }

    successResponse(res, {}, 'Logout successful');
  } catch (err) {
    console.error(err);
    errorResponse(res, 'Server error', 'An error occurred on the server', 500);
  }
};




module.exports = { register, login, refresh, resetPassword, requestResetPassword, logout };
