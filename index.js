const express = require("express");
const app = express();

const root = require("./routes");

app.use(root);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
