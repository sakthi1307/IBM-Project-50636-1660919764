FROM ubuntu:22.04

ADD . /project






RUN apt-get update

RUN apt-get install -y curl
RUN curl -fsSL https://deb.nodesource.com/setup_16.x 
# RUN deb https://deb.nodesource.com/node_16.x focal main
# RUN deb-src https://deb.nodesource.com/node_16.x focal main







RUN apt-get install -y nodejs

RUN apt install -y npm


WORKDIR /project
RUN npm install
CMD npm start
EXPOSE 3000