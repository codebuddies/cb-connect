#!/usr/bin/env bash

root_directory=`git rev-parse --show-toplevel 2>/dev/null`

commitHash=$(git rev-parse HEAD)
echo "Commit hash: $commitHash"

echo -e "\nInstalling dependencies"
meteor npm install --production

echo -e "Building app"
mkdir  -p $root_directory/build/
meteor build --directory $root_directory/build/ --allow-superuser

sleep 2

cd  $root_directory/build/bundle/programs/server/ && meteor npm install
mkdir -p /cb-connect/bundles/$commitHash
mv $root_directory/build/bundle/* /cb-connect/bundles/$commitHash
cp $root_directory/settings.json /cb-connect/bundles/$commitHash/settings.json
rm -rf $root_directory/build
rm -rf $root_directory/.meteor/local
rm -rf $root_directory/node_modules


echo -e "\n\nBundle created successfully! Run following command to deploy it:"
echo "./deploy.sh $commitHash"

echo -e "\nRUN TIME: $(($SECONDS / 60))m $(($SECONDS % 60))s"
