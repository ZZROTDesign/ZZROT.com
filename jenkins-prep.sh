#!bin/sh
function cleanAllContainers {
	allContainers="$(docker ps -a -q)"
	if [ ! "$allContainers" ]; then
		echo No Containers To Clean!
	else
		docker rm -f $allContainers
	fi
}

function cleanAllImages {
	listedImages="$(docker images -aq)"
	if [ ! "$listedImages" ]; then
		echo No Images to Delete!
	else
		docker rmi -f $listedImages
	fi
}

cleanAllContainers
cleanAllImages
