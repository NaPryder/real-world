

# backend express.js
FROM node:16.18-alpine as backend
WORKDIR /app
COPY backend/package*.json ./backend/
RUN  cd backend && npm install 
COPY . .
CMD ["node", "./backend/server.js"]

