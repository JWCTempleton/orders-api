const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const database = {
	users: [
	{
		id: "123",
		name: 'John Doe',
		email: 'johndoe@gmail.com',
		password: 'enter',
		orders: 3,
		dateJoined: new Date()
	},
	{
		id: "124",
		name: 'Jane Doe',
		email: 'janedoe@gmail.com',
		password: 'enter2',
		orders: 5,
		dateJoined: new Date()
	}
	]
}

app.get('/', (req, res)=> {
	res.send(database.users);
})

app.post('/signin', (req, res) => {
	if (req.body.email === database.users[0].email &&
		req.body.password === database.users[0].password) {
		res.json('success!')
	}else {
		res.status(400).json('error with your login.')
	}
})

app.post('/register', (req,res)=> {
	const { email, name, password } = req.body;
	database.users.push({
		id: "125",
		name: name,
		email: email,
		password: password,
		orders: 0,
		dateJoined: new Date()
	})
	res.json(database.users[database.users.length-1]);
})

app.get('/profile/:id', (req, res)=> {
	const { id } = req.params;
	let found = false;
	database.users.forEach(user => {
		if (user.id === id) {
			found = true;
			return res.json(user);
		}  
	})
	if (!found) {
		res.status(400).json('not found');
	}
})

app.listen(3000, ()=> {
	console.log('App is working! Port 3000 looking good.');
})

/*
Planned routes:
/ --> res= Response is working!
/signin --> POST user info, res=success/fail
/register --> POST user data to db, res=user obj
/profile/:userId --> GET user data, res=user  THIS WILL BE THE USER DASHBOARD TO SEE ORDERS IN PROCESS
*/