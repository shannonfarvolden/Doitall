const express = require('express');
const bodyParser = require('body-parser');
const expressGraphQL = require('express-graphql');
const fs = require('fs');
const path = require('path');
const { makeExecutableSchema } = require('graphql-tools');
const { Client } = require('pg');
const app = express();
const root = require('./routes');

const schema = require('./graphql/schema');

const start = async () => {
    // make database connections
    const pgClient = new Client('postgresql://localhost:5432/doitall_dev');
    await pgClient.connect();

    var app = express();
    app.use('/graphql', expressGraphQL({
        schema: schema,
        graphiql: true,
        context: { pgClient },
    }));

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🖥 Server listenning on PORT: ${PORT}`);
    });
};

start();
