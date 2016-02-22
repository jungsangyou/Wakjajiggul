mongoimport --db chat --collection users --file ./db/users.json --jsonArray
mongoimport --db chat --collection rooms --file ./db/rooms.json --jsonArray
mongoimport --db chat --collection roomUsers --file ./db/roomUsers.json --jsonArray