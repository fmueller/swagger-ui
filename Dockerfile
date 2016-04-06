FROM registry.opensource.zalan.do/stups/node:0.12-20

# add scm-source
ADD /scm-source.json /scm-source.json

# copy resources
COPY ./dist/ /www/dist/
COPY ./dist/index.html /www/
COPY ./server/server.js /www/
COPY ./server/package.json /www/

# install dependencies

# create env.js as user
RUN touch /www/dist/env.js && chmod 0666 /www/dist/env.js

# expose and start
WORKDIR /www/
RUN npm install
CMD node server.js
EXPOSE 8080