mongoimport --db chat --collection users --file ./users.json --jsonArray
mongoimport --db chat --collection rooms --file ./rooms.json --jsonArray
mongoimport --db chat --collection roomUsers --file ./roomUsers.json --jsonArray