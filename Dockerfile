FROM node:14

# Change working directory
WORKDIR "/app"

# use bash vs sh
SHELL ["/bin/bash", "-c", "-l"]

# Update packages and install dependency packages for services
RUN apt-get update \
 && apt-get dist-upgrade -y \
 && apt-get clean \
 && apt-get install -y --no-install-recommends apt-utils docker \
 && echo 'Finished installing dependencies'

# Install npm production packages
COPY package*.json /app/
RUN cd /app; npm install

COPY . /app

EXPOSE 8080

CMD ["npm", "run", "start"]