FROM node:22

WORKDIR /app

COPY package.json ./package.json

RUN npm install

COPY . .

RUN chmod -R a+x node_modules
# RUN npm config set user 0
# RUN npm config set unsafe-perm true

EXPOSE 8080

CMD ["npm", "start"]