FROM node:20.13.1-alpine

WORKDIR /app

COPY backend/package.json ./package.json
COPY backend/src ./src/
COPY backend/tsconfig.json ./tsconfig.json
COPY backend/jest.config.js ./jest.config.js
COPY backend/package-lock.json ./package-lock.json

RUN npm install
RUN npm install -g typescript
RUN tsc
RUN npm run test
CMD ["npm", "run", "start"]