#!/bin/bash
# Wayin integration Ask widget build

echo -e "---------- *** Cleaning build directory *** ----------\n"
rm -dfr ask-build
mkdir -p ask-build/css

# Process CSS
echo -e "---------- *** Processing CSS with lessc *** ----------\n"
node_modules/less/bin/lessc --yui-compress app/css/ask.less > ask-build/css/ask.css

# Run the optimizer
echo -e "---------- *** Running r.js optimizer *** ----------\n"
node_modules/requirejs/bin/r.js -o app/js/ask.build.js

echo -e "---------- *** Removing unecessary files and folders *** ----------\n"
# Remove unnecessary files
rm ask-build/build.txt
find ask-build -type f -name "*.less" -o -name "*.handlebars" -o -name "*-dev*" | xargs rm
find ask-build -type f -name "*.js" -not -name "*main.js" -not -name "require*" | xargs rm

# Remove empty folders
find ask-build -depth -empty -type d -exec rmdir {} \;

echo -e "---------- *** Renaming index.html *** ----------\n"
mv ask-build/index-ask.html ask-build/index.html