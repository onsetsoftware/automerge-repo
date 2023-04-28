import EventEmitter from "eventemitter3";
import { InboundMessagePayload, NetworkAdapter, PeerDisconnectedPayload } from "./NetworkAdapter.js";
import { ChannelId, PeerId } from "../types.js";
export declare class NetworkSubsystem extends EventEmitter<NetworkSubsystemEvents> {
    #private;
    private adapters;
    peerId: PeerId;
    constructor(adapters: NetworkAdapter[], peerId?: PeerId);
    addNetworkAdapter(networkAdapter: NetworkAdapter): void;
    sendMessage(peerId: PeerId, channelId: ChannelId, message: Uint8Array, broadcast: boolean): void;
    join(channelId: ChannelId): void;
    leave(channelId: ChannelId): void;
}
export interface NetworkSubsystemEvents {
    peer: (payload: PeerPayload) => void;
    "peer-disconnected": (payload: PeerDisconnectedPayload) => void;
    message: (payload: InboundMessagePayload) => void;
}
export interface PeerPayload {
    peerId: PeerId;
    channelId: ChannelId;
}
//# sourceMappingURL=NetworkSubsystem.d.ts.map