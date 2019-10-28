FROM node:10.16.3-alpine

RUN apk update
RUN apk add --no-cache --virtual .gyp \
        python \
        make \
        g++

RUN apk add nginx

RUN mkdir -p /var/www/myTownApi

WORKDIR /var/www/myTownApi

COPY package.json /var/www/myTownApi/package.json

RUN npm install
RUN npm install sails@1.2.3 -g

ENV NODE_ENV=production

COPY . /var/www/myTownApi

# Removing default website
RUN rm /etc/nginx/conf.d/default.conf
RUN rm /etc/nginx/nginx.conf


# Add nginx config file
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/sites.conf /etc/nginx/conf.d/sites.conf

COPY start.sh start.sh
RUN chmod +x start.sh
EXPOSE 80

CMD ./start.sh
