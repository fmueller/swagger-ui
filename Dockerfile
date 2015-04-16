FROM node:0.12.1

RUN npm install express@4.12.3

# copy resources
COPY ./dist/ /www/dist/
COPY ./server.js /www/

# create env.js as user
RUN touch /www/dist/env.js && chmod 0666 /www/dist/env.js

# expose and start
WORKDIR /www/
CMD node server.js
EXPOSE 8080