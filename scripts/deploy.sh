#!/usr/bin/env bash

if [ -z $1"" ]; then
  echo 'Please add commit hash to be deployed'
  echo ''
  exit
fi

mkdir -p /cb-connect/logs/

DIRECTORY=/cb-connect/bundles/$1

if [ ! -d "$DIRECTORY" ]; then
  echo "Bundle not found for commit $1"
  exit
fi


CONFIG=$DIRECTORY/settings.json
/opt/nodejs/bin/forever stop cb-connect

cd $DIRECTORY

export COMMIT_HASH=$1
export ROOT_URL='https://connect.codebuddies.org'
export MONGO_URL='mongodb+srv://rootuser:ns2HcknGze79V9N3@prod-e8gy0.mongodb.net/cb-connect'
export PORT=3000
export METEOR_SETTINGS=`cat $CONFIG`
# export MAIL_URL='smtp://user:password@mailhost:port/'

/opt/nodejs/bin/forever start     \
  -a                              \
  -l /cb-connect/logs/forever.log     \
  -e /cb-connect/logs/forever.error   \
  --uid 'cb-connect'   \
  main.js


echo "RUN TIME: $(($SECONDS / 60))m $(($SECONDS % 60))s"
