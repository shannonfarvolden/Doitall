const Base = `
type Query {
    dummy: Boolean
}

type Mutation {
    dummy: Boolean
}

type Meta {
    count: Int
}

scalar Url
scalar Date`;

module.exports = () => [Base];