let token = null
const subscribers = new Set()

const setToken = (t) => {
    token = t
    for (const s of subscribers) {
        try { s(token) } catch (e) { /* ignore */ }
    }
}

const getToken = () => token

const clearToken = () => setToken(null)

const subscribe = (cb) => {
    subscribers.add(cb)
    return () => subscribers.delete(cb)
}

export default { setToken, getToken, clearToken, subscribe }
