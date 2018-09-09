import { parse } from 'handlebars';
import { Annotation } from '@manta-style/core';

export function parseAnnotationFromString(handlebarString: string): Annotation {
  const mustacheStatement = parse(handlebarString).body[0];
  return simplifyAst(mustacheStatement);
}

function simplifyAst(statement: hbs.AST.Expression): Annotation {
  if (isMustacheStatement(statement) || isSubExpression(statement)) {
    const { path } = statement;
    if (isPathExpression(path)) {
      const fnName: string = path.original;
      const params: Annotation[] = [];
      const hash: { [name: string]: Annotation } = {};
      for (const param of statement.params) {
        params.push(simplifyAst(param));
      }
      if (statement.hash) {
        for (const hashPair of statement.hash.pairs) {
          hash[hashPair.key] = simplifyAst(hashPair.value);
        }
      }
      return {
        type: 'expression',
        name: fnName,
        params,
        hash,
      };
    } else {
      throw new Error(
        'MustacheStatement with Literal key instead of PathExpression.',
      );
    }
  } else if (isPathExpression(statement)) {
    return {
      type: 'expression',
      name: statement.original,
      params: [],
      hash: {},
    };
  } else if (
    isStringLiteral(statement) ||
    isBooleanLiteral(statement) ||
    isNumberLiteral(statement)
  ) {
    return {
      type: 'literal',
      value: statement.value,
    };
  } else if (isUndefinedLiteral(statement)) {
    return {
      type: 'literal',
      value: undefined,
    };
  } else if (isNullLiteral(statement)) {
    return {
      type: 'literal',
      value: null,
    };
  } else {
    throw new Error('Unsupported Handlbars Annotation');
  }
}

// TODO: Setup webpack, extract these into a new file
function isMustacheStatement(
  statement: hbs.AST.Expression,
): statement is hbs.AST.MustacheStatement {
  return statement.type === 'MustacheStatement';
}

function isSubExpression(
  statement: hbs.AST.Expression,
): statement is hbs.AST.SubExpression {
  return statement.type === 'SubExpression';
}

function isPathExpression(
  statement: hbs.AST.Expression,
): statement is hbs.AST.PathExpression {
  return statement.type === 'PathExpression';
}

function isStringLiteral(
  statement: hbs.AST.Expression,
): statement is hbs.AST.StringLiteral {
  return statement.type === 'StringLiteral';
}

function isBooleanLiteral(
  statement: hbs.AST.Expression,
): statement is hbs.AST.BooleanLiteral {
  return statement.type === 'BooleanLiteral';
}

function isNumberLiteral(
  statement: hbs.AST.Expression,
): statement is hbs.AST.NumberLiteral {
  return statement.type === 'NumberLiteral';
}

function isUndefinedLiteral(
  statement: hbs.AST.Expression,
): statement is hbs.AST.UndefinedLiteral {
  return statement.type === 'UndefinedLiteral';
}

function isNullLiteral(
  statement: hbs.AST.Expression,
): statement is hbs.AST.NullLiteral {
  return statement.type === 'NullLiteral';
}
