import { decode, encode } from "cbor-x";
import EventEmitter from "eventemitter3";
/**
 * EphemeralData provides a mechanism to broadcast short-lived data — cursor positions, presence,
 * heartbeats, etc. — that is useful in the moment but not worth persisting.
 */
export class EphemeralData extends EventEmitter {
    /** Broadcast an ephemeral message */
    broadcast(channelId, message) {
        const messageBytes = encode(message);
        this.emit("message", {
            targetId: "*",
            channelId: ("m/" + channelId),
            message: messageBytes,
            broadcast: true,
        });
    }
    /** Receive an ephemeral message */
    receive(senderId, grossChannelId, message) {
        const data = decode(message);
        const channelId = grossChannelId.slice(2);
        this.emit("data", {
            peerId: senderId,
            channelId,
            data,
        });
    }
}
