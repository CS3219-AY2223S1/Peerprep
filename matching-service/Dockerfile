FROM node:16-alpine
WORKDIR /usr/matching-service
COPY package.json .
RUN npm install --quiet
COPY . .
EXPOSE 8001
RUN npx prisma generate
CMD ["npm", "run", "dev"]