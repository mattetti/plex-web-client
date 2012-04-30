Plex Web Client
===============


Build Dependencies
------------------
+ node.js (http://www.nodejs.org)
+ express (http://www.http://expressjs.com)
+ http-proxy (https://github.com/nodejitsu/node-http-proxy)
+ watch (https://github.com/mikeal/watch)
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

4. Navigate to `localhost:3000`


Heroku Environment
------------------
1. Install Heroku Toolbelt (https://toolbelt.heroku.com/)

2. Log into Heroku
	
	`heroku login`

3. Add your ssh public key to Heroku

	`heroku keys:add`

4. Add Heroku as a remote to your git repository

	`git remote add heroku git@heroku.com:plex.git`

5. Application can be tested locally in a Heroku environment

	`echo "NODE_ENV=production" > .env` or `echo "NODE_ENV=development" > .env`
	
	`foreman start`

6. Navigate to `localhost:5000`

7. Deploy application on Heroku

	`git push heroku master`
