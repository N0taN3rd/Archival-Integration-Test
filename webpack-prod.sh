#!/usr/bin/env bash
rm public/js/*.js
rm public/js/*.gz
NODE_ENV=production node node_modules/.bin/webpack --config ./webpack/cors/webpack.config.prod.js --color -p --progress
NODE_ENV=production node node_modules/.bin/webpack --config ./webpack/redirect/webpack.chain.config.prod.js --color -p --progress
NODE_ENV=production node node_modules/.bin/webpack --config ./webpack/redirect/webpack.cookie.config.prod.js --color -p --progress
NODE_ENV=production node node_modules/.bin/webpack --config ./webpack/webpack.default.config.prod.js --color -p --progress
NODE_ENV=production node node_modules/.bin/webpack --config ./webpack/iframeMadness/webpack.config.prod.js --color -p --progress
NODE_ENV=production node node_modules/.bin/webpack --config ./webpack/replayTest/webpack.config.prod.js --color -p --progress