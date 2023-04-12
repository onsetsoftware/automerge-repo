import { DocCollection } from "./DocCollection.js";
import { EphemeralData } from "./EphemeralData.js";
import { NetworkAdapter } from "./network/NetworkAdapter.js";
import { NetworkSubsystem } from "./network/NetworkSubsystem.js";
import { StorageAdapter } from "./storage/StorageAdapter.js";
import { StorageSubsystem } from "./storage/StorageSubsystem.js";
import { DocumentId, PeerId } from "./types.js";
/** A Repo is a DocCollection with networking, syncing, and storage capabilities. */
export declare class Repo extends DocCollection {
    #private;
    networkSubsystem: NetworkSubsystem;
    storageSubsystem?: StorageSubsystem;
    ephemeralData: EphemeralData;
    constructor({ storage, network, peerId, sharePolicy }: RepoConfig);
}
export interface RepoConfig {
    /** Our unique identifier */
    peerId?: PeerId;
    /** A storage adapter can be provided, or not */
    storage?: StorageAdapter;
    /** One or more network adapters must be provided */
    network: NetworkAdapter[];
    /**
     * Normal peers typically share generously with everyone (meaning we sync all our documents with
     * all peers). A server only syncs documents that a peer explicitly requests by ID.
     */
    sharePolicy?: SharePolicy;
}
export type SharePolicy = (peerId: PeerId, documentId?: DocumentId) => Promise<boolean>;
//# sourceMappingURL=Repo.d.ts.map