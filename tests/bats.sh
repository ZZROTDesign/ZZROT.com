#!/usr/bin/env bats

@test "It should respond with HTTP 200 Okay" {
	run curl --write-out "%{http_code}\n" --silent --output /dev/null localhost
	[[ "$output" =~ "200" ]]
}

@test "blog should return 200" {
  run curl --write-out "%{http_code}\n" --silent --output /dev/null localhost:2368
	#[[ ${lines[0]} =~ "<!doctype html>" ]]
  [[ "$output" =~ "200" ]]
}
