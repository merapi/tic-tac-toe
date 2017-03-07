FROM node:6.5.0

WORKDIR /src

COPY . /src

RUN npm install

EXPOSE 80

CMD ["npm", "start"]
