FROM node:18-alpine

WORKDIR /app

RUN npm install -g pnpm@9.1.3

EXPOSE 3002 

CMD ["npm", "run", "dev"]