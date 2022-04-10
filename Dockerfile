
FROM ubuntu:18.04

WORKDIR /app

COPY package*.json ./

RUN apt-get update

RUN apt-get install -y wget curl gnupg gnupg2 gnupg1



RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list


RUN apt-get update

RUN apt-get install -y google-chrome-stable

RUN curl -sL https://deb.nodesource.com/setup_17.x | bash - \
    && apt-get install -y nodejs

RUN npm install

COPY . .
RUN npm run build
CMD [ "npm", "run", "start" ]
