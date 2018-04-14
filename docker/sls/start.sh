#!/usr/bin/env bash

# WORKDIR has been set to /usr/app so we can launch directly yarn and sls directly from here

# Install node_modules at first time.
if [ ! -d "./node_modules" ]; then
    yarn
fi

node_modules/.bin/sls offline --host 0.0.0.0 --stage $STAGE --prefix $STAGE --skipCacheInvalidation