const pg = require('pg');
const jsonfile = require('jsonfile');

// set all of the configuration in an object
const configs = {
  user: 'weiwenlee',
  host: '127.0.0.1',
  database: 'nba_db',
  port: 5432,
};

// create a new instance of the client
const client = new pg.Client(configs);


//Read file -> if no errors -> Client Connect -> if no errors -> Loop through the data of the json file -> set the querystring and values variables -> Client Query -> if no errors -> Insert the data
jsonfile.readFile('players.json', (err, obj) => {

  if (err) console.error(err);

  // start using your client
  client.connect((err) => {
    if (err) {
      console.log('error', err.message);
    }

    for(let i = 0; i < obj.players.length; i++){
      let player = obj.players[i];
      //console.log(player);

      // your queries go here
      let queryString = 'INSERT INTO players(name, age, team, games, points) VALUES ($1, $2, $3, $4, $5) RETURNING *';

      // your dynamic values go here
      let values = [player.name, player.age, player.team, player.games, player.points];
      console.log("values: ", values);


    client.query(queryString, values, (err, res) => {
      if (err) {
        console.log('query error', err.message);
      } else {
        console.log('Added', res.rows[0]);
      }

      // the last query you make, close the connection.
      //client.end();
    });
  }
  });
});
