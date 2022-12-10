FROM node:18.12.1-bullseye
WORKDIR /usr/src/app
COPY . .
RUN yarn
CMD ["yarn", "dev"]
