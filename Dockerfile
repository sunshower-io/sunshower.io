FROM sunshower/sunshower-base:1.0.0
ENV BRANCH_SPEC "1.0.0/master"
ENV PROJECT_NAME=sunshower-site
ENV SITEMASTER_GITHUB_USERNAME ""
ENV SITEMASTER_GITHUB_PASSWORD ""
RUN apt-get update
RUN apt-get install curl software-properties-common -y
RUN curl -sL https://deb.nodesource.com/setup_9.x | bash -
RUN apt-get install nodejs -y
RUN npm install gulp sass -g
RUN npm rebuild node-sass --force
RUN mkdir -p /home/sunshower/$PROJECT_NAME
COPY . /home/sunshower/$PROJECT_NAME
WORKDIR /home/sunshower/$PROJECT_NAME
RUN chmod +x ./scripts/build.sh 
ENTRYPOINT ./scripts/build.sh  $BRANCH_SPEC
#ENTRYPOINT /bin/bash
