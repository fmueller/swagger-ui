FROM registry.opensource.zalan.do/stups/node:0.12-20

RUN npm install superagent@1.2.0
RUN npm install express@4.12.3
RUN npm install winston@1.0.0

# add scm-source
ADD /scm-source.json /scm-source.json

# copy resources
COPY ./dist/ /www/dist/
COPY ./dist/index.html /www/
COPY ./server.js /www/

# create env.js as user
RUN touch /www/dist/env.js && chmod 0666 /www/dist/env.js

# expose and start
WORKDIR /www/
CMD node server.js
EXPOSE 8080