#!/usr/bin/env bash

rm -r build/src
cp -r src build
cd build
tsc --build tsconfig.json
npm start