import EventEmitter from "eventemitter3";
import debug from "debug";
export class NetworkSubsystem extends EventEmitter {
    adapters;
    peerId;
    #log;
    #adaptersByPeer = {};
    #channels;
    constructor(adapters, peerId = randomPeerId()) {
        super();
        this.adapters = adapters;
        this.peerId = peerId;
        this.#log = debug(`automerge-repo:network:${this.peerId}`);
        this.#channels = [];
        this.adapters.forEach(a => this.addNetworkAdapter(a));
    }
    addNetworkAdapter(networkAdapter) {
        networkAdapter.connect(this.peerId);
        networkAdapter.on("peer-candidate", ({ peerId, channelId }) => {
            this.#log(`peer candidate: ${peerId} `);
            // TODO: This is where authentication would happen
            if (!this.#adaptersByPeer[peerId]) {
                // TODO: handle losing a server here
                this.#adaptersByPeer[peerId] = networkAdapter;
            }
            this.emit("peer", { peerId, channelId });
        });
        networkAdapter.on("peer-disconnected", ({ peerId }) => {
            this.#log(`peer disconnected: ${peerId} `);
            delete this.#adaptersByPeer[peerId];
            this.emit("peer-disconnected", { peerId });
        });
        networkAdapter.on("message", msg => {
            const { senderId, channelId, broadcast, message } = msg;
            this.#log(`message from ${senderId}`);
            // If we receive a broadcast message from a network adapter we need to re-broadcast it to all
            // our other peers. This is the world's worst gossip protocol.
            // TODO: This relies on the network forming a tree! If there are cycles, this approach will
            // loop messages around forever.
            if (broadcast) {
                Object.entries(this.#adaptersByPeer)
                    .filter(([id]) => id !== senderId)
                    .forEach(([id, peer]) => {
                    peer.sendMessage(id, channelId, message, broadcast);
                });
            }
            this.emit("message", msg);
        });
        networkAdapter.on("close", () => {
            this.#log("adapter closed");
            Object.entries(this.#adaptersByPeer).forEach(([peerId, other]) => {
                if (other === networkAdapter) {
                    delete this.#adaptersByPeer[peerId];
                }
            });
        });
        this.#channels.forEach(c => networkAdapter.join(c));
    }
    sendMessage(peerId, channelId, message, broadcast) {
        if (broadcast) {
            Object.entries(this.#adaptersByPeer).forEach(([id, peer]) => {
                this.#log(`sending broadcast to ${id}`);
                peer.sendMessage(id, channelId, message, true);
            });
        }
        else {
            const peer = this.#adaptersByPeer[peerId];
            if (!peer) {
                this.#log(`Tried to send message but peer not found: ${peerId}`);
                return;
            }
            this.#log(`Sending message to ${peerId}`);
            peer.sendMessage(peerId, channelId, message, false);
        }
    }
    join(channelId) {
        this.#log(`Joining channel ${channelId}`);
        this.#channels.push(channelId);
        this.adapters.forEach(a => a.join(channelId));
    }
    leave(channelId) {
        this.#log(`Leaving channel ${channelId}`);
        this.#channels = this.#channels.filter(c => c !== channelId);
        this.adapters.forEach(a => a.leave(channelId));
    }
}
function randomPeerId() {
    return `user-${Math.round(Math.random() * 100000)}`;
}
