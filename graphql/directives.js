const { forEachField } = require('graphql-tools');
const { getArgumentValues } = require('graphql/execution/values');
const jwt = require('jsonwebtoken');
const { AuthorizationError } = require('../errors');

const directiveResolvers = {
  isAuthenticated(result, source, args, context) {
    if (!context.user) {
      throw new AuthorizationError({
        message: 'You are not authenticated!, please login first.!'
      });
    }
    return result;
  },
  hasRole(result, source, { role }, context) {
    if (role === context.user.role) return result;
    throw new Error(`Must have role: ${role}, you have role: ${context.user.role}`)
  },
};

// Credit: agonbina https://github.com/apollographql/graphql-tools/issues/212
const attachDirectives = schema => {
  forEachField(schema, field => {
    const directives = field.astNode.directives;
    directives.forEach(directive => {
      const directiveName = directive.name.value;
      const resolver = directiveResolvers[directiveName];

      if (resolver) {
        const oldResolve = field.resolve;
        const Directive = schema.getDirective(directiveName);
        const args = getArgumentValues(Directive, directive);

        field.resolve = function() {
          const [source, _, context, info] = arguments;
          let promise = oldResolve.call(field, ...arguments);

          const isPrimitive = !(promise instanceof Promise);
          if (isPrimitive) {
            promise = Promise.resolve(promise);
          }

          return promise.then(result =>
            resolver(result, source, args, context, info)
          );
        };
      }
    });
  });
};

module.exports = { attachDirectives };
