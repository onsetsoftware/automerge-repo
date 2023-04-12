import { DocCollection } from "../DocCollection.js";
import { ChannelId, DocumentId, PeerId } from "../types.js";
import { Synchronizer } from "./Synchronizer.js";
/** A CollectionSynchronizer is responsible for synchronizing a DocCollection with peers. */
export declare class CollectionSynchronizer extends Synchronizer {
    #private;
    private repo;
    constructor(repo: DocCollection);
    /**
     * When we receive a sync message for a document we haven't got in memory, we
     * register it with the repo and start synchronizing
     */
    receiveSyncMessage(peerId: PeerId, channelId: ChannelId, message: Uint8Array): Promise<void>;
    /**
     * Starts synchronizing the given document with all peers that we share it generously with.
     */
    addDocument(documentId: DocumentId): Promise<void>;
    removeDocument(documentId: DocumentId): void;
    /** Adds a peer and maybe starts synchronizing with them */
    addPeer(peerId: PeerId): Promise<void>;
    /** Removes a peer and stops synchronizing with them */
    removePeer(peerId: PeerId): void;
}
//# sourceMappingURL=CollectionSynchronizer.d.ts.map