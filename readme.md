# _Project_

A small web app built in NodeJS/express for uploading and listing album information.  

The uploader only accepts CSV files specifically structured with a header line of:

	'artist,album,Release Year,Rating' 

and following lines of album information based on that structure.

It will not allow repeats, and each album must have values for both the Artist and Album to be added to the list

## Project Setup

-Download & Install NodeJS, npm package manager, and Ruby/Gems

-Download & Install MongoDB, and make sure it's running on the default port (27017)

-cd to project directory

	npm install
	gem install sass

-to run a watcher that will live-compile your Sass files as changes happen

	grunt

-to manually compile Sass files

	grunt sass

-to lint your javascript

	grunt jshint

-start server: default port is 3000
	
	npm start

## Testing

	npm test

## Proposed Features

- open up back-end as RESTful api
- use client-side MVC framework to directly edit album fields and sync records with server
- allow sorting by any field directly on client-side
- improve album-parse module to handle album titles containing commas
- on form submit, navigate to page to fill in invalid information for unsaved albums
- pre-save hook to grab url for album artwork
- user accounts and auth

## Authors

J.J. Idt

## License

MIT License
