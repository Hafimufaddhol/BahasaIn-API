const bcrypt = require('bcrypt');
const { User,Token } = require('../models');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { generateAccessToken, generateRefreshToken,generateResetToken ,validateToken} = require('../utils/tokenHelper');
const {sendEmail}=require('../utils/sendEmail');
const { validatePassword }=require('../utils/validatePassword');
const { error } = require('console');



const register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    const error = validatePassword(password,confirmPassword)

    if (error.length > 0) {
      return res.status(400).json({ error });
    }

    // Hash password sebelum disimpan
    const hashedPassword = await bcrypt.hash(password, 10);

    // Buat pengguna baru
    const user = await User.create({ name, email, password: hashedPassword });

    // Hilangkan password dari respons
    const { password: _, ...userResponse } = user.toJSON();

    res.status(201).json(userResponse);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


const login = async (req, res) => {
  try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user || !(await bcrypt.compare(password, user.password))) {
          return res.status(401).json({ error: 'Invalid credentials' });
      }
      const accessToken = generateAccessToken(user);
      const refreshToken = await generateRefreshToken(user);
      res.json({ accessToken, refreshToken });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
};


const refresh = async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(403).send('Refresh token is required');
    }
  
    try {
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
      const userId = await validateToken(refreshToken,'refresh');
      if (!userId) {
        return res.status(403).json({error:"Invalid refresh Token1"});
      } 
      const newAccessToken = generateAccessToken({ id: decoded.id, name: decoded.name });
      res.json({ accessToken: newAccessToken });
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        console.error('Token expired at:', err.expiredAt);
        return res.status(403).json({error:"Refresh token expired"});
      }
      console.error('JWT Verification Error:', err.message);
      return res.status(403).json({error:"Invalid refresh Token2"});
    }
  };

  const requestResetPassword = async (req, res) => {
    const { email } = req.body;
  
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ error: 'Email tidak ditemukan' });
      }
  
      // Generate JWT token
      const resetToken = await generateResetToken(user);
  
      // Kirim email reset password
      const resetLink = `http://localhost:3000/reset-password/${resetToken}`;
      await sendEmail({
        to: user.email, // Alamat email penerima
        token: resetToken, // Token reset password
      });
      console.log(`Reset link: ${resetLink}`);
  
      res.json({ message: 'Email reset password telah dikirim' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Terjadi kesalahan pada server' });
    }
  };
  
  const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password,confirmPassword } = req.body;

  const error = validatePassword(password,confirmPassword)

  if (error.length > 0) {
    return res.status(400).json({ error }); // Mengembalikan semua error
  }

  try {
    
    // Verifikasi token
    const userId = await validateToken(token, 'reset')
    if (!userId) {
      return res.status(404).json({ error: 'Token tidak valid' });
    }

    // Update password
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.update({ password: hashedPassword }, { where: { id: userId } });
    await Token.destroy({ where: { token, type: 'reset' } });

    res.json({ message: 'Password berhasil direset' });
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(400).json({ error: 'Token sudah kedaluwarsa' });
    }
    res.status(400).json({ error: 'Token tidak valid' });
  }
};

const logout = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ error: 'Refresh token diperlukan untuk logout' });
  }

  try {
    // Hapus refresh token dari database
    const deletedToken = await Token.destroy({
      where: { token: refreshToken, type: 'refresh' },
    });

    if (!deletedToken) {
      return res.status(404).json({ error: 'Token tidak ditemukan atau sudah dihapus' });
    }

    res.status(200).json({ message: 'Logout berhasil' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Terjadi kesalahan pada server' });
  }
};

  

module.exports = { register, login, refresh, resetPassword, requestResetPassword, logout };
