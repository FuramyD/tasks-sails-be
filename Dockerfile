FROM node:lts
WORKDIR /app
COPY . /app/.

RUN npm install -g sails@1.5.8
RUN npm install -f
EXPOSE 1337
ENTRYPOINT ["npm", "run", "start"]
