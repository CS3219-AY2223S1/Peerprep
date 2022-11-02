FROM node:16-alpine
WORKDIR /usr/user-service
COPY package.json .
RUN npm install --quiet
COPY . .
EXPOSE 8000
CMD ["npm", "run", "dev"]