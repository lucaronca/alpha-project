#!/usr/bin/env bash

export PROJECT_ABSOLUTE_PATH=$(git rev-parse --show-toplevel)

# Define stage name for local environment
export STAGE='local'

# Process args to proxy them to docker-compose up
ARGS=""
DETACHED=1
declare -a DETACHED_ARGS=( "" "-d" )

while [[ $# -gt 0 ]]
do
    arg="$1"

    case $arg in
        "--no-detached" | "-nd")
            DETACHED=0
            shift
            ;;
        "-d")
            shift
            ;;
        *)
            ARGS+=" $arg"
            shift
            ;;
    esac
done

# Start docker compose
docker-compose -f $PROJECT_ABSOLUTE_PATH/docker/docker-compose.yml down

docker-compose -f $PROJECT_ABSOLUTE_PATH/docker/docker-compose.yml up $ARGS ${DETACHED_ARGS[${DETACHED}]}

if [[ $DETACHED -eq 0 ]]
then
    exit
fi

# Wait for serverless offline to be working
SLS_READY=0
SPIN='⣾⣽⣻⢿⡿⣟⣯⣷ ⠁⠂⠄⡀⢀⠠⠐⠈'
MESSAGE='Waiting for serverless offline dev server ...'
GREEN='\033[0;32m'
i=0

until [ $SLS_READY -ne 0 ]
do
    printf "\r${MESSAGE} ${SPIN:$(( $i %${#SPIN} )):1} "

    if (( i%10 == 0 )) && [ $(curl\
        --silent\
        --output /dev/null\
        --write-out "%{http_code}\n"\
        http://0.0.0.0:80) -ne 000 ]
    then
        SLS_READY=1
    fi

    let i++
    sleep .1
done

printf "\r${MESSAGE} ${GREEN}done\n"
