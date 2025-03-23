#!/bin/bash

APP_NAME="hoobank" 
echo "Killing any running instances of $APP_NAME..."
pkill -f $APP_NAME
npm install
npm install react-router-dom@latest
npx vite
npm start 
