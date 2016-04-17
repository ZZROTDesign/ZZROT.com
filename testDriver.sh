#!/bin/sh -x

# Driver that runs after normal build tests and then
# opens the links, logging the page status for
# review, but not a test currently
bats tests/bats.sh
homeUrl=http://162.243.15.248
blogUrl=http://162.243.15.248:2368
ç
casperjs test tests/tests.js --homeUrl=$homeUrl --blogUrl=$blogUrl

echo ''
# First CLI is link, second is maximum page count to open
echo "Spidering links from home page"
casperjs tests/spider.js $homeUrl 10
echo ''
echo "Spidering links from blog"
casperjs tests/spider.js $blogUrl 20