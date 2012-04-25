Plex Web Client
===============


Build Dependencies
------------------
+ node.js (http://www.nodejs.org)
+ express (http://www.http://expressjs.com)
+ http-proxy (https://github.com/nodejitsu/node-http-proxy)
+ r.js (http://www.requirejs.org/docs/optimization.html#download)
+ less (http://http://www.lesscss.org)


Installing Build Dependencies
-----------------------------
1. Install node.js

    `brew install node`

   Alternatively you can also download the respective package installer from node's website.

2. Install node depencencies

   From the project repository root:

	`npm install .`


Build Process
-------------
1. Run build script

	`./build.sh`

2. Run web server

	`node server.js`

4. Navigate to `localhost:3000` (adding dev=true as URL param will point wrapper to development index)
