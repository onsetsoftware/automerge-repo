import * as A from "@automerge/automerge";
import { DocumentId } from "../types.js";
import { StorageAdapter } from "./StorageAdapter.js";
export declare class StorageSubsystem {
    #private;
    constructor(storageAdapter: StorageAdapter);
    loadBinary(documentId: DocumentId): Promise<Uint8Array>;
    load<T>(documentId: DocumentId, prevDoc?: A.Doc<T>): Promise<A.Doc<T>>;
    save(documentId: DocumentId, doc: A.Doc<unknown>): void;
    remove(documentId: DocumentId): void;
}
//# sourceMappingURL=StorageSubsystem.d.ts.map