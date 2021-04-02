'use strict';

const express = require('express');
const mongo = require( 'mongodb' ).MongoClient

// Constants
const PORT = 8000;
const HOST = process.env.HOST || '0.0.0.0';

// App
const app = express();

const url = process.env.CONNECTIONSTRING;
console.log('CONNECTIONSTRING - ', url);
// const db = null;
// async() =>  {
//   db = await connect( url );
// };


app.get('/foo', async (req, res) => {
  console.log(`!!!Hello foo!!!`);
  const db = await connect( url );
  const dbo = db.db('notes');
  const docs = await dbo.collection('tests').find({}).toArray();
  console.log('docs - ', docs);
  res.send((docs));
});


app.get('/', (req, res) => {
    console.log(`!!!Hello World!!!`);
    res.send('Hello World');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);



async function connect( url ) {
	if( !url ) {
		throw new Error( 'Connection String Required. Please provide a mongodb connection string. See https://docs.mongodb.com/manual/reference/connection-string/ for more details.' ).stack
	}

	try {
		const db = await mongo.connect( url, { useNewUrlParser: true, useUnifiedTopology: true } )
    // console.log('db - ', db);
		return db
	} catch( err ) {
		throw new Error( `Error connecting to mongo. ${err.message}` ).stack
	}
	
}



// const ronin     = require( 'ronin-server' )
// const mocks     = require( 'ronin-mocks' )
// const database  = require( 'ronin-database' )
// const server = ronin.server()

// console.log('CONNECTIONSTRING - ', process.env.CONNECTIONSTRING);
// database.connect( process.env.CONNECTIONSTRING )

// server.use( '/foo', (req, res) => {
//   console.log('+++++++++++++++++req - foo');
//   return res.json({ "foo": "bar" })
// })
// server.use( '/', mocks.server( server.Router(), false, false ) )

// server.start()