FROM node:6

ARG app_dir=/app

COPY ./package.json ${app_dir}/package.json
COPY ./yarn.lock ${app_dir}/yarn.lock

WORKDIR ${app_dir}

RUN yarn install
