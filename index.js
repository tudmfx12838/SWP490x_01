const express = require('express');
const app = express();

app.get('/', (req, res) => {
   res.send('123hello from server123!')
})

app.get('/api/test', (req, res) => {
  res.json({ message: 'I am a message from Server!!!!!'});
})

app.listen(4000, () => console.log('App listening on port 4000'));