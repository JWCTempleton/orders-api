const express = require('express');

const app = express();

app.get('/', (req, res)=> {
	res.send('Response is working!')
})

app.listen(3000, ()=> {
	console.log('App is working! Port 3000 looking good.');
})