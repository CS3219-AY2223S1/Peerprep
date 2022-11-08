FROM node:16-alpine
WORKDIR /usr/question-service
COPY package.json .
RUN npm install --quiet
COPY . .
EXPOSE 8003
CMD ["npm", "run", "dev"]