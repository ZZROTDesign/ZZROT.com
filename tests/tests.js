var links = 0;

var homeUrl = '';
//var blogUrl = '';

//homeUrl = cli.get(0);
//blogUrl = test.cli.get(1);

var url = 'http://192.168.99.100';
var blogUrl = 'http://192.168.99.100';
var url = '';

// Working 200 page test
casper.test.begin('Test home page 200', 1, function(test) {
  url = casper.cli.get('homeUrl');
  console.log('Home Url: ' + url);
    casper.start(url, function() {
        test.assertHttpStatus(200);
    });
    casper.run(function() {
        test.done();
    });
});


casper.test.begin('Test blog page 200', 1, function(test) {
  casper.start(casper.cli.get('blogUrl'), function() {
    console.log("Blog Url: " + casper.cli.get('homeurl'));
    test.assertHttpStatus(200);
  });
  casper.run(function() {
    test.done();
  });
});

casper.test.begin('Test page links', 1, function(test) {
  casper.start(casper.cli.get('homeUrl'), function() {
    console.log("Home Url: " + casper.cli.get('homeurl'));
    casper.then(function() {
      url = this.getElementAttribute('a', 'href');
      console.log(url);
      test.assertHttpStatus(200);
    });
  });
  casper.run(function() {
    test.done();
  });
});
