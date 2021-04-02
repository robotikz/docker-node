FROM node:15.11.0 as base

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]


FROM base as test
RUN npm install
COPY . .
RUN npm run test

FROM base as prod
ENV NODE_ENV=production
RUN npm install --production
COPY . .
EXPOSE 8000
CMD [ "node", "server.js" ]