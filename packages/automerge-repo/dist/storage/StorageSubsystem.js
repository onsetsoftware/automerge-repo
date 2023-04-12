import * as A from "@automerge/automerge";
import { mergeArrays } from "../helpers/mergeArrays.js";
export class StorageSubsystem {
    #storageAdapter;
    #changeCount = {};
    constructor(storageAdapter) {
        this.#storageAdapter = storageAdapter;
    }
    #saveIncremental(documentId, doc) {
        const binary = A.getBackend(doc).saveIncremental();
        if (binary && binary.length > 0) {
            if (!this.#changeCount[documentId]) {
                this.#changeCount[documentId] = 0;
            }
            this.#storageAdapter.save(`${documentId}.incremental.${this.#changeCount[documentId]}`, binary);
            this.#changeCount[documentId]++;
        }
    }
    #saveTotal(documentId, doc) {
        const binary = A.save(doc);
        this.#storageAdapter.save(`${documentId}.snapshot`, binary);
        for (let i = 0; i < this.#changeCount[documentId]; i++) {
            this.#storageAdapter.remove(`${documentId}.incremental.${i}`);
        }
        this.#changeCount[documentId] = 0;
    }
    async loadBinary(documentId) {
        const result = [];
        let binary = await this.#storageAdapter.load(`${documentId}.snapshot`);
        if (binary && binary.length > 0) {
            result.push(binary);
        }
        let index = 0;
        while ((binary = await this.#storageAdapter.load(`${documentId}.incremental.${index}`))) {
            if (binary && binary.length > 0)
                result.push(binary);
            index += 1;
        }
        return mergeArrays(result);
    }
    async load(documentId, prevDoc = A.init()) {
        return A.loadIncremental(prevDoc, await this.loadBinary(documentId));
    }
    save(documentId, doc) {
        if (this.#shouldCompact(documentId)) {
            this.#saveTotal(documentId, doc);
        }
        else {
            this.#saveIncremental(documentId, doc);
        }
    }
    // TODO: make this, you know, good.
    #shouldCompact(documentId) {
        return this.#changeCount[documentId] >= 20;
    }
}
