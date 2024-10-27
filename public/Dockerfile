# Sử dụng image node để build và chạy ứng dụng React
FROM node:16-alpine

WORKDIR /app

# Copy package.json và yarn.lock trước để cài đặt dependencies
COPY package*.json ./

# Cài đặt các dependencies
RUN npm install

# Copy toàn bộ mã nguồn vào container
COPY . .

# Expose port 3000 (React frontend chạy trên port này)
EXPOSE 3000

# Start React app
CMD ["npm", "start"]
