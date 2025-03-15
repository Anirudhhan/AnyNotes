const connectToMongo = require('./db');
const express = require('express');

connectToMongo();

const app = express()
const port = 3000

app.use(express.json()); 
app.get('/', (req, res) => {
  res.send('Dummy!')
})

app.use('/api/auth', require('./routes/auth'));

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})