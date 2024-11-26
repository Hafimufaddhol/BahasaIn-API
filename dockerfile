# Gunakan node sebagai base image
FROM node:18

# Buat direktori kerja
WORKDIR /src

# Salin file package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Salin semua file proyek
COPY . .

# Ekspos port aplikasi
EXPOSE 8080

# Perintah untuk menjalankan aplikasi
CMD ["npm", "start"]

