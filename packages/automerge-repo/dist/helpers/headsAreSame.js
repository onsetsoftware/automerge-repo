import * as A from "@automerge/automerge";
import { arraysAreEqual } from "./arraysAreEqual.js";
export const headsAreSame = (a, b) => {
    const aHeads = A.getHeads(a);
    const bHeads = A.getHeads(b);
    return arraysAreEqual(aHeads, bHeads);
};
