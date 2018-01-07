#!/bin/bash -eu



docker build -t sunshower-site -f Dockerfile .   
docker run -it --rm -e  MVN_REPO_USERNAME=myMavenRepo \
-e MVN_REPO_PASSWORD=lid-DOG-bin-123  \
-e MVN_REPO_URL=https://mymavenrepo.com/repo/IRgrTxMdF4OnnbNAkfnJ \
-e SITEMASTER_GITHUB_USERNAME=sunshower-robot \
-e SITEMASTER_GITHUB_PASSWORD=mzlapQ123 \
--name "sunshower-site" "sunshower-site" 

