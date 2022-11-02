FROM node:16-alpine
WORKDIR /usr/communication-service
COPY package.json .
RUN npm install --quiet
COPY . .
EXPOSE 8002
CMD ["npm", "run", "dev"]