#!/bin/sh
nginx -g 'daemon on;'
sails lift --hookTimeout 80000