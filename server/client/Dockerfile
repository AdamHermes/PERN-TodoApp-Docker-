# client/Dockerfile
FROM node:20-alpine
WORKDIR /app
ENV REACT_APP_BACKEND_URL=http://localhost:5000
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]    