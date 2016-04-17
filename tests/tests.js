var links = 0;
var homeUrl = 'http://192.168.99.100';
var blogUrl = 'http://192.168.99.100';

// Working 200 page test
casper.test.begin('Test home page 200', 1, function(test) {
    casper.start(homeUrl, function() {
        test.assertHttpStatus(200);
    });
    casper.run(function() {
        test.done();
    });
});


casper.test.begin('Test blog page 200', 1, function(test) {
  casper.start(blogUrl, function() {
    test.assertHttpStatus(200);
  });
  casper.run(function() {
    test.done();
  });
});

casper.test.begin('Test page links', 1, function(test) {
  casper.start(homeUrl, function() {
    var url = '';
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
