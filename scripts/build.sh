#!/bin/bash

#gradle clean assemble \
#-PmavenRepositoryUrl=${MVN_REPO_URL} \
#-PmavenRepositoryUsername=${MVN_REPO_USERNAME} \
#-PmavenRepositoryPassword=${MVN_REPO_PASSWORD} \
#-Pversion=1.0.0.Final \
#-Penv.version=1.0.0.Final


git config --global user.email "$SITEMASTER_GITHUB_USERNAME"
git config --global user.password "$SITEMASTER_GITHUB_PASSWORD"
git config --global credential.helper 'cache --timeout 7200'
git config --global credential.helper cache

git clone https://github.com/sunshower-io/sunshower.io.git .
pushd ./new && npm install -y && gulp clean build && popd
mkdir -p sunshower.io/docs
cp -r new/* sunshower.io/docs
cp -r CNAME sunshower.io/docs
cd sunshower.io &&
git config remote.origin.url https://${SITEMASTER_GITHUB_USERNAME}:${SITEMASTER_GITHUB_PASSWORD}@github.com/sunshower-io/sunshower.io.git &&
git add . &&
git commit -am "Updating site from CD" &&
git push -f origin master

