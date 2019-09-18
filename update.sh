#!/usr/bin/env bash
pm2 stop ri-business
cd /home/gtweb/test/ri-business/develop
git clean -df
git checkout .
git pull origin develop
npm install --registry=https://registry.npm.taobao.org
NODE_ENV=production TEST_ENV=dev BASE_URL= CDN_URL= ./node_modules/.bin/gulp build
NODE_TLS_REJECT_UNAUTHORIZED=0 NODE_ENV=production TEST_ENV=dev BASE_URL= CDN_URL= ENTRY=../dest/app.js pm2 start ./.bin/run.js -i 2 -n ri-business
