FROM node:16-alpine
WORKDIR /usr/collaboration-service
COPY package.json .
RUN npm install --quiet
COPY . .
EXPOSE 9001
CMD ["npm", "run", "dev"]