import { DocHandle } from "../DocHandle.js";
import { ChannelId, PeerId } from "../types.js";
import { Synchronizer } from "./Synchronizer.js";
/**
 * DocSynchronizer takes a handle to an Automerge document, and receives & dispatches sync messages
 * to bring it inline with all other peers' versions.
 */
export declare class DocSynchronizer extends Synchronizer {
    #private;
    private handle;
    constructor(handle: DocHandle<any>);
    get documentId(): import("../types.js").DocumentId;
    hasPeer(peerId: PeerId): boolean;
    beginSync(peerId: PeerId): Promise<void>;
    endSync(peerId: PeerId): void;
    receiveSyncMessage(peerId: PeerId, channelId: ChannelId, message: Uint8Array): Promise<void>;
}
//# sourceMappingURL=DocSynchronizer.d.ts.map