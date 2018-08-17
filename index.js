const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const root = require('./routes');

app.use(bodyParser.urlencoded({extended: true}));

app.use(root);

// handle errors
app.use((err, req, res, next) => {
  res.status(500).send(err);
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🖥 Server listenning on PORT: ${PORT}`);
});
