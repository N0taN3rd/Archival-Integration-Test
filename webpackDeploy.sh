#!/usr/bin/env bash
rm public/js/*.js
rm public/js/*.gz

rm public/rpTest/*.js
rm public/rpTest/*.gz

rm public/rspa/*.js
rm public/rspa/*.gz

rm public/frontAssets/*.js
rm public/frontAssets/*.gz

echo Building Cors
NODE_ENV=production node node_modules/.bin/webpack --config ./webpack/cors/webpack.config.prod.js --color -p --progress
echo Building Redirection
NODE_ENV=production node node_modules/.bin/webpack --config ./webpack/redirect/webpack.config.prod.js --color -p --progress
echo Building Default Bundle
NODE_ENV=production node node_modules/.bin/webpack --config ./webpack/webpack.default.config.prod.js --color -p --progress
echo Building Iframe Madness
NODE_ENV=production node node_modules/.bin/webpack --config ./webpack/iframeMadness/webpack.config.prod.js --color -p --progress
echo Building Replay Test
NODE_ENV=production node node_modules/.bin/webpack --config ./webpack/replayTest/webpack.config.prod.js --color -p --progress
echo Building Acidv2
NODE_ENV=production node node_modules/.bin/webpack --config ./webpack/acidv2/webpack.config.prod.js --color -p --progress
echo Building React SPA
NODE_ENV=production node node_modules/.bin/webpack --config ./webpack/reactSpa/webpack.config.prod.js --color -p --progress
