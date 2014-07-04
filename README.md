## Install Notes
- Install nodejs (+ npm), then bower, grunt and compass installed ("-g" makes it globally available) :
	For node and npm:
	$ run installer from http://nodejs.org/
	$ npm --version
	
	For bower:
	$ sudo npm install -g bower
	
	For grunt:
	$ sudo npm install -g grunt-cli

	For compass from gem (http://compass-style.org/install/):
	$ sudo gem update --system
	$ sudo gem install compass

## Development instructions
- Assuming you have bower and grunt installed:
	$ npm install
	$ bower install

## Usage
- "grunt serve" host the site locally
- "grunt build" use to regenerate /dist dir. Dist can be vhosted but still need to proxy /view and /api to jenkins.

## Proxying API Requests for localhost development
- Using Grunt Connect Proxy: https://www.npmjs.org/package/grunt-connect-proxy
- Followed the basic setup in that readme. I'm not too sure about what all the middleware stuff is doing, but instructions were fairly copy/pastable. 
- Required including lrSnippet and mountFolder calls at top. I don't know what they do, per se, but they are included.
- Routes to be proxied to jenkins: ['/view', '/api'] to JENKINS_HOST

## For Vhosting
- add following (or similar) to your vhost:
	<VirtualHost *:80>
		...
	    DocumentRoot "/SERVER/PATH/TO/jenkins-radiator/dist"
	    ServerName bv-radiator
		...
	    <Directory />    
	        RewriteEngine On
	        RewriteRule /(view|api)/(.*) http://JENKINS_HOST/$1/$2 [P]
	        ...
	    </Directory>
	</VirtualHost>