INSTRUCTIONS TO RUN THE PROJECT:


NOTE: Treasure Hunter (Memory Match) has it's own node modules,
containing it's own libraries to operate as a game. Do not delete this.

Follow the steps below in the order they're written in.


FRONTEND FILES
--------------
1. Go to Frontend -> src -> menu -> Menu.js
	- Line 173, make sure the user_id is 'admin'



BACKEND FILES
--------------
1. Go to Backend -> database -> mySQLConnect.js
	- Make sure the user:
	- and the root:
	are accurate to your local machine for databases.

2. Go to Backend -> .env
	- Make sure the DB_USER and DB_PASS are accurate. MAYBE
	  also make sure the APP_DOMAIN is accurate to what you use.


SQL DATABASE
------------
1. In the file explorer, open up the Database with MySQL WorkBench
2. Simply click the lightning bolt to run the database table

BACKEND
-------
1. Enter the directory "Backend"
2. Run the following commands
	- npm install
	- npm audit fix
	- npm install koa
	- npm audit fix
3. To then run it: nodemon .\api_server.js


FRONTEND
--------
1. Enter the directory "Frontend"
2. Run the following commands
	- npm install
	- npm audit fix
	- npm install axios
	- npm audit fix
3. To then run it: npm start