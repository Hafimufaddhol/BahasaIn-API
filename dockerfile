# Gunakan Node.js sebagai base image
FROM node:18

# Set working directory
WORKDIR /src/app

# Copy package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy seluruh file proyek
COPY . .

# Expose port aplikasi (sesuai port yang digunakan di Express, biasanya 8080)
EXPOSE 8080

# Perintah untuk menjalankan server
CMD   ["npx", "sequelize-cli", "db:migrate"] && ["npm", "start"]

