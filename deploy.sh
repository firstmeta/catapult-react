#!/bin/bash

sudo rm -rf /usr/local/var/www/dist/
sudo cp -R dist /usr/local/var/www/
sudo nginx -s stop
sudo nginx

