import * as A from "@automerge/automerge";
import EventEmitter from "eventemitter3";
import type { ChannelId, DocumentId, PeerId } from "./types.js";
/** DocHandle is a wrapper around a single Automerge document that lets us listen for changes. */
export declare class DocHandle<T>//
 extends EventEmitter<DocHandleEvents<T>> {
    #private;
    documentId: DocumentId;
    constructor(documentId: DocumentId, { isNew, timeoutDelay }?: DocHandleOptions);
    isReady: () => boolean;
    /**
     * Returns the current document, waiting for the handle to be ready if necessary.
     */
    value(): Promise<A.unstable.Doc<T>>;
    loadAttemptedValue(): Promise<A.unstable.Doc<T>>;
    /** `load` is called by the repo when the document is found in storage */
    load(binary: Uint8Array): void;
    /** `update` is called by the repo when we receive changes from the network */
    update(callback: (doc: A.Doc<T>) => A.Doc<T>): void;
    /** `change` is called by the repo when the document is changed locally  */
    change(callback: A.ChangeFn<T>, options?: A.ChangeOptions<T>): Promise<void>;
    /** `request` is called by the repo when the document is not found in storage */
    request(): void;
}
interface DocHandleOptions {
    isNew?: boolean;
    timeoutDelay?: number;
}
export interface DocHandleMessagePayload {
    destinationId: PeerId;
    channelId: ChannelId;
    data: Uint8Array;
}
export interface DocHandleChangePayload<T> {
    handle: DocHandle<T>;
}
export interface DocHandlePatchPayload<T> {
    handle: DocHandle<T>;
    patches: A.Patch[];
    before: A.Doc<T>;
    after: A.Doc<T>;
}
export interface DocHandleEvents<T> {
    change: (payload: DocHandleChangePayload<T>) => void;
    patch: (payload: DocHandlePatchPayload<T>) => void;
}
export declare const HandleState: {
    readonly IDLE: "idle";
    readonly LOADING: "loading";
    readonly REQUESTING: "requesting";
    readonly READY: "ready";
    readonly ERROR: "error";
};
export type HandleState = typeof HandleState[keyof typeof HandleState];
export declare const Event: {
    readonly CREATE: "CREATE";
    readonly LOAD: "LOAD";
    readonly FIND: "FIND";
    readonly REQUEST: "REQUEST";
    readonly UPDATE: "UPDATE";
    readonly TIMEOUT: "TIMEOUT";
};
export {};
//# sourceMappingURL=DocHandle.d.ts.map