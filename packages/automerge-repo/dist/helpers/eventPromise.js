/** Returns a promise that resolves when the given event is emitted on the given emitter. */
export const eventPromise = (emitter, event) => new Promise(resolve => emitter.once(event, d => resolve(d)));
