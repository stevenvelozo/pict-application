#!/bin/bash

pushd bookstore_example
npm install && npm run build
popd

pushd historic_events_example
npm install && npm run build
popd

pushd postcard_example
npm install && npm run build
popd

pushd simple
npm install && npm run build
popd
