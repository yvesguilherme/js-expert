docker run -p "8080:80" -d nginx
sleep .5
curl --silent localhost:8080

CONTAINER_ID=$(docker ps | grep nginx | awk '{print $1}')
echo '\nlogs...\n'
echo $CONTAINER_ID | xargs -I {id} docker logs {id}
echo '\nrm...\n'
echo $CONTAINER_ID | xargs -I {id} docker rm -f {id}