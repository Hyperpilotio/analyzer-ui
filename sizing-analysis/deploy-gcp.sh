#!/usr/bin/env bash

if [ "$#" -lt 1 ]
then
    echo "Usage: deploy-gcp.sh <userId> <mode:optional>"
    exit 1
fi

DEPLOYER_URL="localhost"

if [ "-$2" = "-" ]; then
  MODE=""
else
  MODE="-$2"
fi

FILE_NAME="deploy-gcp$MODE.json"

curl -s -XPOST $DEPLOYER_URL:7777/v1/users/$1/deployments --data-binary @$FILE_NAME

echo "Please check progress of your deployment at http://$DEPLOYER_URL:7777/ui"
