#!/bin/bash
# Stops other branches then master from getting built and pushed.
if [ "$TRAVIS_PULL_REQUEST" != "false" -o "$TRAVIS_BRANCH" != "master" ]; then exit 0; fi

set -o errexit

# config
git config --global user.email "auto@deploy.er"
git config --global user.name "Travis CI"

# build
npm i
npm run build

# deploy
cd dist
git init
git add .
git commit -m "Automatic update from Travis"
git push --force --quiet "https://${GITHUB_TOKEN}@$github.com/${GITHUB_REPO}.git" master:gh-pages > /dev/null 2>&1
