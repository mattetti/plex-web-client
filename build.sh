#!/bin/bash

echo -e "---------- *** Cleaning build directory *** ----------\n"
#find build -type f -not -name ".gitignore"  | xargs rm
#find build -depth -empty -type d -not -name ".git" -exec rmdir {} \;
mkdir -p build/css

# Process CSS
echo -e "---------- *** Processing CSS with lessc *** ----------\n"
node_modules/less/bin/lessc --yui-compress app/less/plex.less > build/css/plex.css

# Run the optimizer
echo -e "---------- *** Running r.js optimizer *** ----------\n"
node_modules/requirejs/bin/r.js -o app/js/build.js

echo -e "---------- *** Removing unecessary files and folders *** ----------\n"
# Remove unnecessary files
rm build/build.txt
#find build -type f -name "*.less" -o -name "*.tpl" -o -name "*-dev*" | xargs rm
# Currently building with Almond, if we need RequireJS features that Almond
# does not support, make sure to add `-not -name "require*"` to this find
#find build -type f -name "*.js" -not -name "main.js" | xargs rm
# Remove empty folders
#find build -depth -empty -type d -exec rmdir {} \;

# Copy over server
cp server.js build/server.js
cp Procfile build/Procfile
cp package.json build/package.json
echo "NODE_ENV=production" > build/.env

# Use this if development index is named something besides index.html
#echo -e "---------- *** Renaming index.html *** ----------\n"
#mv build/myindex.html build/index.html