const express = require('express');
const bodyParser = require('body-parser');
const expressGraphQL = require('express-graphql');
const app = express();
const knex = require('./db');
const schema = require('./graphql/schema');
const jwt = require('express-jwt');
require('dotenv').config();

const start = async () => {
    const app = express();
    const auth = jwt({
      secret: process.env.JWT_SECRET,
      credentialsRequired: false
    })

    app.use('/graphql', auth, expressGraphQL((req) => {
      return {
        schema: schema,
        graphiql: true,
        context: {
          knex,
          user: req.user
        }
      }
    }));

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🖥 Server listenning on PORT: ${PORT}`);
    });
};

start();
