const express = require('express');
const app = express();
const { users } = require('./users');

app.get('/', (req, res) => {
  res.send('<h1> Home Page</h1><a href="/api/users">Users</a>');
});

app.get('/api/users', (req, res) => {
  const simpleUsers = users.map((user) => {
    const { id, name, language } = user;
    return { id, name, language };
  });

  res.json(simpleUsers);
});

app.get('/api/users/:userID', (req, res) => {
  const { userID } = req.params;
  const singleUser = users.find((user) => user.id === userID);

  if (!singleUser) {
    return res.status(404).send('User Does Not Exist');
  }

  return res.json(singleUser);
});


app.get('/api/v1/users/query', (req, res) => {
  const { language, name } = req.query;
  let filteredUsers = [...users];


  console.log(`Query received - language: ${language}, name: ${name}`);

  // Filter by language (case-insensitive)
  if (language) {
    filteredUsers = filteredUsers.filter(
      (user) => user.language.toLowerCase() === language.toLowerCase()
    );
  }

  // Filter by name (case-insensitive)
  if (name) {
    filteredUsers = filteredUsers.filter((user) =>
      user.name.toLowerCase().startsWith(name.toLowerCase())
    );
  }

  if (filteredUsers.length < 1) {
    return res.status(200).json({ success: true, data: [] });
  }

  res.status(200).json(filteredUsers);

});


app.listen(3000, () => {
  console.log('Server is listening on port 3000....');
});
