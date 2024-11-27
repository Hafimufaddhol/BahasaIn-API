require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'BahasaIn',
    dialect: process.env.DB_DIALECT || 'mysql',
    host: process.env.DB_HOST || '/cloudsql/bahasain:asia-southeast2:bahasain',
    // dialectOptions: {
    //   socketPath: process.env.DB_HOST || '/cloudsql/bahasain:asia-southeast2:bahasain', // Gunakan socketPath untuk koneksi
    // },
    define: {
      underscored: true, // Menggunakan snake_case untuk semua model
      timestamps: true,   // Mengaktifkan created_at dan updated_at
      createdAt: 'created_at', // Nama kolom createdAt
      updatedAt: 'updated_at', // Nama kolom updatedAt
    },
  },
  test: {
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'BahasaIn',
    dialect: process.env.DB_DIALECT || 'mysql',
    host: process.env.DB_HOST || '/cloudsql/bahasain:asia-southeast2:bahasain',
    dialectOptions: {
      socketPath: process.env.DB_HOST || '/cloudsql/bahasain:asia-southeast2:bahasain', // Gunakan socketPath untuk koneksi
    },
    define: {
      underscored: true, // Menggunakan snake_case untuk semua model
      timestamps: true,   // Mengaktifkan created_at dan updated_at
      createdAt: 'created_at', // Nama kolom createdAt
      updatedAt: 'updated_at', // Nama kolom updatedAt
    },
  },
  production: {
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'BahasaIn',
    dialect: process.env.DB_DIALECT || 'mysql',
    host: process.env.DB_HOST || '/cloudsql/bahasain:asia-southeast2:bahasain',
    dialectOptions: {
      socketPath: process.env.DB_HOST || '/cloudsql/bahasain:asia-southeast2:bahasain', // Gunakan socketPath untuk koneksi
    },
    define: {
      underscored: true,
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
};
