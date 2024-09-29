FROM node:18-alpine

WORKDIR /app

COPY . .

RUN cd ./frontend/ && npm run build && cd ../backend && npm run build

WORKDIR /app/backend

ENTRYPOINT [ "npm", "run", "start" ]
