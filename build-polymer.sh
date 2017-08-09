#!/usr/bin/env bash

cwd="$(pwd)"

apolymer="$cwd/apps/tests/polymer"
tpolymer="$cwd/public/tests/polymer"
bpolymer="$cwd/node_modules/.bin/polymer"

cd ${tpolymer}
rm -rd *
cd ${apolymer}

node ${bpolymer} build

cd build/unbundled
#
mv -f bower_components ${tpolymer}
mv -f data ${tpolymer}
mv -f images ${tpolymer}
mv -f src ${tpolymer}
mv -f index.html ${tpolymer}
mv -f manifest.json ${tpolymer}