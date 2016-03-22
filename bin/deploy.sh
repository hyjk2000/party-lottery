#!/bin/bash
set -e # exit with nonzero exit code if anything fails
DEPLOY_ROOT="$PWD/deploy"
DEPLOY_TIME=`date +"%Y%m%dT%H%M%S"`

if [ -d "$DEPLOY_ROOT" ]; then
  rm -rf "$DEPLOY_ROOT"
fi

git init "$DEPLOY_ROOT"

cp index.prod.html "$DEPLOY_ROOT/index.html"
cp apple-touch-icon.png "$DEPLOY_ROOT/"
cp favicon.png "$DEPLOY_ROOT/"
cp LICENSE "$DEPLOY_ROOT/"
cp -R dist "$DEPLOY_ROOT/"
rm -f "$DEPLOY_ROOT/dist/*.map"
cp node_modules/babel-polyfill/dist/polyfill.min.js "$DEPLOY_ROOT/dist/browser-polyfill.min.js"

cd $DEPLOY_ROOT

echo "CACHE MANIFEST" > lottery.appcache
echo "# Deploy: $DEPLOY_TIME" >> lottery.appcache
find dist/* -print >> lottery.appcache

git config user.name "CI"
git config user.email "ci@party-lottery.dummy"

git add .
git commit -m "Deploy to GitHub Pages"
git push --force --quiet "https://$CI_USER_TOKEN@github.com/hyjk2000/party-lottery.git" master:gh-pages > /dev/null 2>&1
