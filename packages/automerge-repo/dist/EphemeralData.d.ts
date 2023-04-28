import EventEmitter from "eventemitter3";
import { ChannelId, PeerId } from "./index.js";
import { MessagePayload } from "./network/NetworkAdapter.js";
/**
 * EphemeralData provides a mechanism to broadcast short-lived data — cursor positions, presence,
 * heartbeats, etc. — that is useful in the moment but not worth persisting.
 */
export declare class EphemeralData extends EventEmitter<EphemeralDataMessageEvents> {
    /** Broadcast an ephemeral message */
    broadcast(channelId: ChannelId, message: unknown): void;
    /** Receive an ephemeral message */
    receive(senderId: PeerId, grossChannelId: ChannelId, message: Uint8Array): void;
}
export interface EphemeralDataPayload {
    channelId: ChannelId;
    peerId: PeerId;
    data: {
        peerId: PeerId;
        channelId: ChannelId;
        data: unknown;
    };
}
export type EphemeralDataMessageEvents = {
    message: (event: MessagePayload) => void;
    data: (event: EphemeralDataPayload) => void;
};
//# sourceMappingURL=EphemeralData.d.ts.map