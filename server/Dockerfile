FROM node:16-alpine

WORKDIR /app

# Copy package.json và cài đặt dependencies
COPY package*.json ./
RUN npm install

# Copy toàn bộ mã nguồn vào container
COPY . .

EXPOSE 5000

CMD ["npm", "start"]
