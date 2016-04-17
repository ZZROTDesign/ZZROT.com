// Set the start URL
var startUrl = 'http://192.168.99.100:2368';
var blogUrl = 'http://192.168.99.100:2368';
var depth = 0;

var casper = require('casper').create();
//casper.echo("Casper CLI passed args:");
require('utils').dump(casper.cli.args);
require("utils").dump(casper.cli.options);

// URL variables
var visitedUrls = [], pendingUrls = [];

// Create instances
var casper = require('casper').create({ /*verbose: true, logLevel: 'debug'*/ });
var utils = require('utils');
var helpers = require('./helpers');

// Spider from the given URL
function spider(url) {

	// Add the URL to the visited stack
	visitedUrls.push(url);

	// Open the URL
	casper.open(url).then(function() {
		depth += 1;
		// Set the status style based on server status code
		var status = this.status().currentHTTPStatus;
		switch(status) {
			case 200: var statusStyle = { fg: 'green', bold: true }; break;
			case 404: var statusStyle = { fg: 'red', bold: true }; break;
			 default: var statusStyle = { fg: 'magenta', bold: true }; break;
		}

		// Display the spidered URL and status
		this.echo(this.colorizer.format(status, statusStyle) + ' ' + url);

		// Find links present on this page
		var links = this.evaluate(function() {
			var links = [];
			Array.prototype.forEach.call(__utils__.findAll('a'), function(e) {
				links.push(e.getAttribute('href'));
			});
			return links;
		});

		// Add newly found URLs to the stack
		var baseUrl = this.getGlobal('location').origin;
		Array.prototype.forEach.call(links, function(link) {
			var newUrl = helpers.absoluteUri(baseUrl, link);
			if (pendingUrls.indexOf(newUrl) == -1 && visitedUrls.indexOf(newUrl) == -1) {
				//casper.echo(casper.colorizer.format('-> Pushed ' + newUrl + ' onto the stack', { fg: 'magenta' }));
				pendingUrls.push(newUrl);
			}
		});

		// If there are URLs to be processed
		if (pendingUrls.length > 0) {
			var nextUrl = pendingUrls.shift();
			//this.echo(this.colorizer.format('<- Popped ' + nextUrl + ' from the stack', { fg: 'blue' }));
			spider(nextUrl);
		}

	});
	if (depth > 10) {
		casper.then.start(blogUrl, function() {
			console.log('helo');
			spider(blogUrl);
		});
	}
}

// Start spidering
casper.start(startUrl, function() {
	spider(startUrl);
});

/*
casper.start(blogUrl, function() {
	console.log('Spidering Blog!!');
	spider(blogUrl);
});
*/
// Start the run
casper.run();
