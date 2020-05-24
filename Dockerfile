# pull down node from docker registry
FROM node:latest
# create directory named src
RUN mkdir /src
# init wokring directory
WORKDIR /src
# add `/app/node_modules/.bin` to $PATH
ENV PATH /src/node_modules/.bin:$PATH
# copy package.json into root folder WD
COPY package.json ./
# copy yarn.lock into root folder WD
COPY yarn.lock ./
# install dependencies 
RUN yarn install
# copy add contents into working direcory
COPY . /src
# expose connection on port 3000
EXPOSE 3000
# start application
ENTRYPOINT [ "yarn", "start" ]

