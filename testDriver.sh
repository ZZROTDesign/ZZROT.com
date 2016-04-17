#!/bin/sh

# Driver that runs after normal build tests and then
# opens the links, logging the page status for
# review, but not a test currently

# Shell bats page 200 tests
bats tests/bats.sh

homeUrl=http://162.243.15.248
blogUrl=http://162.243.15.248:2368

# Repeat of the bats tests
casperjs test tests/tests.js --homeUrl=$homeUrl --blogUrl=$blogUrl

# Don't fail build because of these status outputs
#set +e
#First CLI is link, second is maximum page count to open
#rm tests/pageStatus.txt
#echo "Spidering links from home page" >> tests/pageStatus.txt
#casperjs tests/spider.js $homeUrl 10 >> tests/pageStatus.txt
#echo ''
#echo "Spidering links from blog"
#casperjs tests/spider.js $blogUrl 20 >> tests/pageStatus.txt
