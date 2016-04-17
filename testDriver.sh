echo "Spider Home"
casperjs tests/spider.js http://192.168.99.100 10

echo "Spider Blog"
casperjs tests/spider.js http://192.168.99.100:2368 20
