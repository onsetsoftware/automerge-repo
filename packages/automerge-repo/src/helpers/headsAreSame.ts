import { arraysAreEqual } from "./arraysAreEqual"

const headsAreSame = <T>(a: A.Doc<T>, b: A.Doc<T>) => {
  const aHeads = A.getHeads(a)
  const bHeads = A.getHeads(b)
  return arraysAreEqual(aHeads, bHeads)
}
