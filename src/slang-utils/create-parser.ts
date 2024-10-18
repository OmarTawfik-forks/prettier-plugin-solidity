import { NonterminalKind, Query } from '@nomicfoundation/slang/cst';
import { Parser } from '@nomicfoundation/slang/parser';
import strip from 'strip-comments';
import { satisfies, minVersion, validRange } from 'semver';

const supportedVersions = Parser.supportedVersions().reverse();

export function createParser(text: string): Parser {
  const versionReqs = collectVersionReqs(text);

  if (versionReqs.some((req) => !minVersion(req))) {
    throw new Error(
      "Couldn't infer any version from the ranges in the pragmas."
    );
  }

  // TODO: I wouldn’t recommend combining individual pragmas into `combinedPragmas`.. imagine the following scenario:
  //
  // ```
  // pragma solidity "x || y";
  // pragma solidity "z";
  // ```
  //
  // The code above would produce `combinedPragmas` with the value `x || y z`, which semantically means `(x) || (y && z)`.
  // What we want instead is`(x || y) && (z)`. So, I suggest keeping them separate:

  // TODO if we ended up selecting the same version that the pragmas were parsed with,
  // should we be able to reuse/just return the already parsed CST, instead of
  // returning a Parser and forcing user to parse it again?

  if (versionReqs.length === 0) {
    return Parser.create(supportedVersions[0]);
  } else {
    return Parser.create(
      supportedVersions.find((v) =>
        versionReqs.every((req) => satisfies(v, req))
      ) || supportedVersions[0]
    );
  }
}

function collectVersionReqs(text: string): string[] {
  // TODO: there is no syntax breaks at import-level, so I think we can just use latest:
  const parser = Parser.create(supportedVersions[0]);
  const parseOutput = parser.parse(NonterminalKind.SourceUnit, text);
  const query = Query.parse(
    '[VersionPragma @versionReqs [VersionExpressionSets]]'
  );
  const matches = parseOutput.createTreeCursor().query([query]);
  const ranges: string[] = [];

  let match;
  while ((match = matches.next())) {
    ranges.push(
      // TODO: no need to create an AST, only to get back the supplied CST node:
      // I suggest `fork()`ing the cursor hear instead, and join its descendants replacing each `isTrivia()` with a single ` `
      // In that case, `strip-comments` won't be needd.

      strip(match.captures.versionReqs[0].node.unparse(), {
        keepProtected: true
      })
    );
  }

  // TODO: I suggest not checking for `parseOutput.isValid()` below,
  // because it can still succeed with a different version, but produce
  // a different CST as well, because the syntax is interpreted differently.

  // // Check if we found pragmas.
  // if (ranges.length === 0) {
  //
  //   // If we didn't find pragmas but succeeded parsing the source we keep it.
  //   if (parseOutput.isValid()) {
  //     return [version];
  //   }

  //   // Otherwise we throw.
  //   throw new Error(
  //     `Using version ${version} did not find any pragma statement and does not parse without errors.`
  //   );
  // }

  // validRange rewrites `0.5.0 - 0.6.0` as `>=0.5.0 <=0.6.0` but it returns
  // null if the range is not valid. We have to coerce null to 'null' so it
  // fails the `minVersion(inferredRange)` call.
  return ranges.map((range) => `${validRange(range)}`);
}
