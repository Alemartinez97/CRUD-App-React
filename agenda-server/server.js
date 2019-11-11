const express = require('express');
const cors = require('cors')
const routePerson = require('./routes/person')
require('./knex.js');

const PORT = process.env.PORT || 3002;
const app = express();

app.use(cors())
app.use(express.json());
app.use('/person', routePerson);

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});