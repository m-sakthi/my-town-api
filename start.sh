#!/bin/sh
nginx -g 'daemon on;'
npx knex migrate:latest
sails lift --hookTimeout 80000