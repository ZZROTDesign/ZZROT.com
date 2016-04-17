# Driver that runs after normal build tests and then
# opens the links, logging the page status for
# review, but not a test currently
bats tests/bats.sh

echo ''
# First CLI is link, second is maximum page count to open
echo "Spidering links from home page"
casperjs tests/spider.js localhost 10
echo ''
echo "Spidering links from blog"
casperjs tests/spider.js localhost 20
