docker run \
  --name postgres \
  -e POSTGRES_USER=yvesguilherme \
  -e POSTGRES_PASSWORD=senha001 \
  -e POSTGRES_DB=heroes \
  -p 5432:5432 \
  -d \
  postgres;

docker logs postgres;

docker exec -it postgres psql --username yvesguilherme --dbname heroes;

CREATE TABLE warriors(id serial PRIMARY KEY, name VARCHAR (255) NOT NULL);

SELECT * FROM warriors;

# mongodb

docker run \
  --name mongodb \
  -e MONGO_INITDB_ROOT_USERNAME=yvesguilherme \
  -e MONGO_INITDB_ROOT_PASSWORD=senha002 \
  -p 27017:27017 \
  -d \
  mongo:4;

docker logs mongodb;