import { assert, AssertionError } from "chai";

import { TealError } from "../../src/errors/errors";
import { ErrorDescriptor } from "../../src/errors/errors-list";
import type { Operator, StackElem, TEALStack } from "../../src/types";

// takes string array and executes opcode to expect teal error
export function execExpectError (
  stack: TEALStack,
  strs: StackElem[],
  op: Operator,
  err: ErrorDescriptor): () => void {
  return () => {
    for (const s of strs) {
      stack.push(s);
    }
    expectTealError(() => op.execute(stack), err);
  };
}

export function expectTealError (
  f: () => any,
  errorDescriptor: ErrorDescriptor,
  matchMessage?: string | RegExp,
  errorMessage?: string
): void {
  try {
    f();
  } catch (error) {
    assert.instanceOf(error, TealError, errorMessage);
    assert.equal(error.number, errorDescriptor.number, errorMessage);
    assert.notMatch(
      error.message,
      /%[a-zA-Z][a-zA-Z0-9]*%/,
      "TealError has an non-replaced variable tag"
    );

    if (typeof matchMessage === "string") {
      assert.include(error.message, matchMessage, errorMessage);
    } else if (matchMessage !== undefined) {
      assert.match(error.message, matchMessage, errorMessage);
    }

    return;
  }
  throw new AssertionError( // eslint-disable-line @typescript-eslint/no-throw-literal
    `TealError number ${errorDescriptor.number} expected, but no Error was thrown`
  );
}
