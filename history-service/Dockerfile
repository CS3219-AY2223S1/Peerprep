FROM node:16-alpine
WORKDIR /usr/history-service
COPY package.json .
RUN npm install --quiet
COPY . .
EXPOSE 8004
CMD ["npm", "run", "dev"]