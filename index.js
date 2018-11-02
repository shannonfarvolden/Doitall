const express = require('express');
const bodyParser = require('body-parser');
const expressGraphQL = require('express-graphql');
const app = express();
const knex = require('./db');
const schema = require('./graphql/schema');

const start = async () => {
    var app = express();
    app.use('/graphql', expressGraphQL({
        schema: schema,
        graphiql: true,
        context: { knex },
    }));

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🖥 Server listenning on PORT: ${PORT}`);
    });
};

start();
