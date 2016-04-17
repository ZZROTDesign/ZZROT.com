# Driver that runs after normal build tests and then
# opens the links, logging the page status for
# review, but not a test currently

echo ''
# First CLI is link, second is maximum page count to open
echo "Spidering links from home page"
casperjs tests/spider.js http://192.168.99.100 10
echo ''
echo "Spidering links from blog"
casperjs tests/spider.js http://192.168.99.100:2368 20
